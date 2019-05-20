<?php

header('Content-Type: application/json');

require_once "./variables.php";

$name = "";
$email = "";
$message = "";

if (isset($_GET["name"])) {
    $name = filter_var($_GET["name"], FILTER_SANITIZE_STRING);
}

if (isset($_GET["email"])) {
    $email = $_GET["email"];
}

if (isset($_GET["message"])) {
    $message = filter_var($_GET["message"], FILTER_SANITIZE_STRING);
}

$isValid = true;
$errorMsg = "";

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $isValid = false;
    $errorMsg = "Please enter a valid email address!";
}

if (strlen($name) == 0 || strlen($name) > 255) {
    $isValid = false;
    $errorMsg = "Please enter a valid name (maximum 255 characters)!";
}

if (strlen($message) == 0 || strlen($message) > 5000) {
    $isValid = false;
    $errorMsg = "Please enter a valid message (maximum 5000 characters)!";
}

$name = urlencode($name);
$email = urlencode($email);
$message = urlencode($message);

$params = "?name={$name}&email={$email}&message={$message}";

if ($isValid) {
    // Do GET
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, $REQUEST_URL . $params);
    // curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    // curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);

    try {
        curl_exec($ch);
        if(curl_errno($ch)){
            throw new Exception(curl_error($ch), curl_errno($ch));
        }
    } catch (Exception $e) {
        $isValid = false;
        $errorMsg = $e -> getMessage();
    }

    curl_close($ch);
}

// Output

$out = array(
    "success" => $isValid,
    "message" => $errorMsg
);

if (!$isValid) http_response_code(400);
else http_response_code(200);

echo json_encode($out);
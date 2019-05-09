import PropTypes from "prop-types"
import React from "react"
import Logo from "./logo";
import './header.css';

const Header = () => (
    <header>
        <div>
            <Logo />
            <div>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#cv">CV</a></li>
                        <li><a href="#experiences">Experiences</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="#blog">Blog</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
)

Header.propTypes = {
    siteTitle: PropTypes.string,
}

Header.defaultProps = {
    siteTitle: ``,
}

export default Header

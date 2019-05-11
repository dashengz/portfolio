const cssvar = require('postcss-css-variables');
module.exports = {
    siteMetadata: {
        title: `Jonathan Dasheng Zhang`,
        description: `I'm an NYC-based Application Developer who's well-versed in front-end design and development as well as back-end scripting and database management.`,
        author: `Jonathan Dasheng Zhang | contact@dashengz.com`,
    },
    plugins: [
        `gatsby-plugin-react-helmet`,
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `images`,
                path: `${__dirname}/src/images`,
            },
        },
        `gatsby-transformer-sharp`,
        `gatsby-plugin-sharp`,
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Jonathan Dasheng Zhang`,
                short_name: `Dasheng Zhang`,
                start_url: `/`,
                background_color: `#2E6696`,
                theme_color: `#2E6696`,
                display: `fullscreen`,
                icon: `src/images/comic-portrait-hair.png`,
            },
        },
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                postCssPlugins: [cssvar()],
                precision: 8,
            },
        },
    ],
};

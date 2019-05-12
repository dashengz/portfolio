const cssvar = require('postcss-css-variables');
module.exports = {
    siteMetadata: {
        title: `Jonathan Dasheng Zhang`,
        description: `I'm an NYC-based Application Developer who's well-versed in front-end design and development as well as back-end scripting and database management.`,
        author: `Jonathan Dasheng Zhang | contact@dashengz.com`,
        siteURL: `https://dashengz.com`,
        email: `contact@dashengz.com`,
        social: {
            github: `https://github.com/dashengz`,
            twitter: `https://twitter.com/jonah91`,
            linkedin: `https://www.linkedin.com/in/dashengzhang`,
            codepen: `https://codepen.io/dashengz`,
        },
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
        {
            resolve: `gatsby-source-filesystem`,
            options: {
                name: `markdowns`,
                path: `${__dirname}/src/markdowns`,
            },
        },
        `gatsby-transformer-remark`,
        `gatsby-plugin-offline`,
        {
            resolve: `gatsby-plugin-sass`,
            options: {
                postCssPlugins: [cssvar()],
                precision: 8,
            },
        },
        {
            resolve: `gatsby-plugin-prefetch-google-fonts`,
            options: {
                fonts: [
                    {
                        family: `Lora`,
                        subsets: [`latin`, `latin-ext`],
                        variants: [`400`, `400i`]
                    },
                    {
                        family: `Open Sans`,
                        subsets: [`latin`, `latin-ext`],
                        variants: [`400`, `400i`, `700`, `700i`]
                    },
                    {
                        family: `Montserrat`,
                        subsets: [`latin`, `latin-ext`],
                        variants: [`400`, `500`, `600`, `700`]
                    },
                ],
            },
        }
    ],
};

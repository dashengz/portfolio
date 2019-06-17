/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, actions }) => {
    const { createNodeField } = actions;
    if (node.internal.type === `MarkdownRemark`) {
        const portfolioPath = createFilePath({ node, getNode, basePath: `src/portfolio/` });
        createNodeField({
            node,
            name: `portfolioPath`,
            value: `/portfolio${portfolioPath}`
        });
    }
};

exports.createPages = ({ graphql, actions }) => {
    const { createPage } = actions;
    return graphql(`
    {
        allMarkdownRemark(filter: {
            frontmatter: {
                category: { eq: "portfolio" }
            }
        }) {
            edges {
                node {
                    frontmatter {
                        id
                    }
                    fields {
                        portfolioPath
                    }
                }
            }
        }
    }
    `).then(result => {
        result.data.allMarkdownRemark.edges.forEach(({ node }) => {
            createPage({
                path: node.fields.portfolioPath,
                component: path.resolve(`./src/templates/portfolio.js`),
                context: {
                    // Data passed to context is available
                    // in page queries as GraphQL variables.
                    portfolioPath: node.fields.portfolioPath,
                    portfolioId: node.frontmatter.id
                },
            })
        })
    })
};
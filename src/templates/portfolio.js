import React, {Component} from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from "../components/contact";
import Img from "gatsby-image";

class Portfolio extends Component {
    render() {
        const data = this.props.data;
        const project = data.content;
        return (
            <Layout>
                <SEO title={[project.frontmatter.title, 'Portfolio'].join(' | ')}
                     keywords={project.frontmatter.keywords.split(', ').concat(`portfolio`, `gatsby`, `application`, `react`)}/>
                <article className="portfolio">
                    <div className="container">
                        <div className="portfolio-header">
                            <h1>{project.frontmatter.title}</h1>
                            <p>{project.frontmatter.blurb}</p>
                            <hr/>
                        </div>
                        <div className="portfolio-body">
                            <div className="portfolio-thumbnail"><Img fluid={data.thumbnail.childImageSharp.fluid}/></div>
                            <div className="portfolio-content" dangerouslySetInnerHTML={{__html: project.html}} />
                        </div>
                    </div>
                </article>
                <Contact/>
            </Layout>
        );
    }
}

export default Portfolio;

export const query = graphql`
    query($portfolioPath: String!, $portfolioId: String!) {
        content: markdownRemark(fields: { portfolioPath: { eq: $portfolioPath } }) {
            html
            frontmatter {
                title
                blurb
                keywords
            }
        }
        thumbnail: file(
            sourceInstanceName: { eq: "portfolio" },
            name: { eq: $portfolioId },
            extension: { eq: "png" }
        ) {
            childImageSharp {
                fluid(maxWidth: 800) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;

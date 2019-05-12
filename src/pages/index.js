import React from "react"
import {graphql} from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Social from "../components/social";

const IndexPage = ({data}) => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
        <div id="hero">
            <div className="bg-img"><Img fluid={data.hero.childImageSharp.fluid}/></div>
            <div className="intro-card">
                <div className="intro-me"><Img fluid={data.me.childImageSharp.fluid}/></div>
                <div className="intro-body" dangerouslySetInnerHTML={{__html: data.intro.html}} />
                <div className="intro-social"><h3>Connect with me</h3><Social /></div>
            </div>
        </div>
    </Layout>
);

export default IndexPage

export const query = graphql`
    query {
        hero: file(relativePath: { eq: "hero-image.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 1500) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        me: file(relativePath: { eq: "portrait.jpg" }) {
            childImageSharp {
                fluid(maxWidth: 500) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
        intro: markdownRemark(frontmatter: {id: {eq: "intro"}}) {
            html
        }
    }
`;

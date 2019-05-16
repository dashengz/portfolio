import React from "react"
import {graphql} from "gatsby"
import Img from 'gatsby-image'

import Layout from "../components/layout"
import SEO from "../components/seo"
import Social from "../components/social";
import Timeline from "../components/timeline";

const IndexPage = ({data}) => (
    <Layout>
        <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
        <section id="hero">
            <div className="hero-backdrop">{``}</div>
            <div className="hero-background"><Img fluid={data.hero.childImageSharp.fluid}/></div>
            <div className="hero-inner">
                <div className="container">
                    <div className="intro-body">
                        <div className="intro-me"><Img fluid={data.me.childImageSharp.fluid}/></div>
                        <div className="intro-content">
                            <div className="intro-bio" dangerouslySetInnerHTML={{__html: data.intro.html}}/>
                            <a href="#contact" className="btn btn-primary">Contact</a>
                        </div>
                        <div className="intro-social"><h3>Connect with me</h3><Social/></div>
                    </div>
                </div>
            </div>
        </section>
        <section id="cv">
            <div className="container">
                <h2>CV</h2>
                <div className="cv-background">{``}</div>
                <div className="cv-cards">
                    {
                        data.cv.edges.map(e =>
                            <div
                                key={e.node.frontmatter.id}
                                dangerouslySetInnerHTML={{__html: e.node.html}}
                            />)
                    }
                </div>
            </div>
        </section>
        <section id="experiences">
            <div className="container">
                <h2>Experiences</h2>
                <div className="timeline-items">
                    {
                        data.experiences.edges.map((e, i) => {
                            const meta = e.node.frontmatter;
                            const img = data.experiencesBackgrounds.edges.filter(k => k.node.name === [meta.category, meta.id].join('.'));
                            return <Timeline
                                key={meta.id}
                                image={img.length ? img[0].node.childImageSharp.fluid : null}
                                label={meta.label}
                                content={e.node.html}
                                alignRight={i % 2 === 0}
                            />;
                        })
                    }
                </div>
            </div>
        </section>
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
        cv: allMarkdownRemark(
            filter: {
                frontmatter: {
                    category: { eq: "cv" }
                }
            },
            sort: {
                fields: [frontmatter___sequence]
                order: ASC
            }
        ) {
            edges {
                node {
                    frontmatter {
                        id
                    }
                    html
                }
            }
        }
        experiences: allMarkdownRemark(
            filter: {
                frontmatter: {
                    category: { eq: "experiences" }
                }
            },
            sort: {
                fields: [frontmatter___sequence]
                order: ASC
            }
        ) {
            edges {
                node {
                    frontmatter {
                        id
                        category
                        label
                        sequence
                    }
                    html
                }
            }
        }
        experiencesBackgrounds: allFile(filter: {relativePath: { regex: "/experiences(.*)jpg/" }}) {
            edges {
                node {
                    name
                    childImageSharp {
                        fluid(maxWidth: 800) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
    }
`;

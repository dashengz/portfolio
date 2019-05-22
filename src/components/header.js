import React from "react"
import {graphql, StaticQuery} from "gatsby"
import Img from 'gatsby-image'

const Header = ({open}) => (
    <header className={open ? 'open' : null}>
        <div>
            <StaticQuery
                query={graphql`
                    query {
                        logo: file(relativePath: { eq: "logo.png" }) {
                            childImageSharp {
                                fluid(maxWidth: 400) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                `}
                render={data => <Img fluid={data.logo.childImageSharp.fluid} />}
            />
            <div>
                <nav>
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#cv">CV</a></li>
                        <li><a href="#experiences">Experiences</a></li>
                        <li><a href="#portfolio">Portfolio</a></li>
                        <li><a href="https://blog.dashengz.com">Blog</a></li>
                        <li><a href="#contact">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
);

export default Header

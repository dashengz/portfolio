import React from "react";
import {graphql, StaticQuery, Link} from "gatsby";
import Img from 'gatsby-image';
import {OutboundLink} from "gatsby-plugin-google-gtag";

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
                        <li><Link to="/#home">Home</Link></li>
                        <li><Link to="/#cv">CV</Link></li>
                        <li><Link to="/#experiences">Experiences</Link></li>
                        <li><Link to="/#portfolio">Portfolio</Link></li>
                        <li><OutboundLink href="https://blog.dashengz.com">Blog</OutboundLink></li>
                        <li><Link to="/#contact">Contact</Link></li>
                    </ul>
                </nav>
            </div>
        </div>
    </header>
);

export default Header

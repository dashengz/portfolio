import React from "react"
import {graphql, StaticQuery} from "gatsby"
import {OutboundLink} from "gatsby-plugin-google-gtag";

const Social = () => (
    <div className="social">
        <div>
            <StaticQuery
                query={graphql`
                    query {
                        site {
                            siteMetadata {
                                social {
                                    github
                                    codepen
                                    twitter
                                    linkedin
                                }
                            }
                        }
                    }
                `}
                render={({site}) => Object.keys(site.siteMetadata.social).map(name => (
                    <span key={name}>
                        <OutboundLink href={site.siteMetadata.social[name]} target="_blank" rel="noopener noreferrer">
                            <i className={'icon icon-' + name} aria-hidden="true"></i><span className="sr-only">{name}</span>
                        </OutboundLink>
                    </span>
                ))}
            />
        </div>
    </div>
);

export default Social

import React from "react"
import {graphql, StaticQuery} from "gatsby"

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
                        <a href={site.siteMetadata.social[name]} target="_blank" rel="noopener noreferrer">
                            <i className={'icon icon-' + name} aria-hidden="true"></i><span className="sr-only">{name}</span>
                        </a>
                    </span>
                ))}
            />
        </div>
    </div>
);

export default Social

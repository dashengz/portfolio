/**
 * Page Layout
 * General Template
 */

import React from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql} from "gatsby"

import Header from "./header"
import '../styles/styles.scss'
import Social from "./social";

const Layout = ({children}) => (
    <StaticQuery
        query={graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
        `}
        render={data => (
            <>
                <Header siteTitle={data.site.siteMetadata.title}/>
                <main>{children}</main>
                <footer>
                    <Social />
                    <div>
                        © Jonathan Dasheng Zhang &middot; {new Date().getFullYear()}
                        <br/>
                        Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
                    </div>
                </footer>
            </>
        )}
    />
);

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout

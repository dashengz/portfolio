/**
 * Page Layout
 * General Template
 */

import React from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql} from "gatsby"

import Header from "./header"
import "./normalize.css"
import "./layout.css"

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
                    © Jonathan Dasheng Zhang &middot; {new Date().getFullYear()}
                    <br/>
                    Built with <a href="https://www.gatsbyjs.org">Gatsby</a>
                </footer>
            </>
        )}
    />
)

Layout.propTypes = {
    children: PropTypes.node.isRequired,
}

export default Layout

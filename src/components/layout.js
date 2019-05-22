/**
 * Page Layout
 * General Template
 */

import React, {Component} from "react"
import PropTypes from "prop-types"
import {StaticQuery, graphql} from "gatsby"

import Header from "./header"
import '../styles/styles.scss'
import Social from "./social";

class Layout extends Component {
    state = {
        menuOpen: false
    };

    menuOpenHandler = () => {
        this.setState(prevState => ({
            menuOpen: !prevState.menuOpen
        }));
    };

    render() {
        const children = this.props.children;
        return (
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
                        <button id="nav-toggler" className={this.state.menuOpen ? 'active' : null} onClick={this.menuOpenHandler}>
                            <span className="sr-only">Toggle Navigation</span>
                            <div><span/><span/><span/></div>
                        </button>
                        <Header siteTitle={data.site.siteMetadata.title} open={this.state.menuOpen ? 'open' : null}/>
                        <main className={this.state.menuOpen ? 'open' : null}>{children}</main>
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
    }
}

Layout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default Layout

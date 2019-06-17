import React, {Component} from "react"
import {graphql} from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Contact from "../components/contact";

class PrivacyPolicy extends Component {
    render() {
        const data = this.props.data;
        return (
            <Layout>
                <SEO title="Home" keywords={[`gatsby`, `application`, `react`]}/>
                <section id="privacy-policy">
                    <div className="container">
                        <div dangerouslySetInnerHTML={{__html: data.privacy.html}}/>
                    </div>
                </section>
                <Contact />
            </Layout>
        );
    }
}

export default PrivacyPolicy;

export const query = graphql`
    query {
        privacy: markdownRemark(frontmatter: {id: {eq: "privacy-policy"}}) {
            html
        }
    }
`;

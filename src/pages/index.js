import React, {Component} from "react"
import {graphql} from "gatsby"
import Img from 'gatsby-image'
import axios from 'axios';

import Layout from "../components/layout"
import SEO from "../components/seo"
import Social from "../components/social";
import Timeline from "../components/timeline";
import Card from "../components/card";

class IndexPage extends Component {
    initialState = {
        formStatus: null,
        formStatusMessage: null
    };
    state = this.initialState;

    formStatusHandler = ({status, msg}, persist) => {
        this.setFormState({status, msg});
        if (!persist) setTimeout(this.setFormState.bind(this, this.initialState), 2000);
    };
    setFormState = ({status, msg}) => {
        this.setState({
            formStatus: status,
            formStatusMessage: msg
        });
    };

    formSubmitHandler = e => {
        // check required fields
        let isValid = true;
        const data = {};
        const form = document.forms['contact-form'];
        for (let i = 0; i < form.elements.length; i++) {
            const field = form.elements[i];
            if (!field.name) continue;
            if (field.required && !field.value.trim()) isValid = false;
            if (field.type === 'email' && !field.value.match(/.+@.+\..+/)) isValid = false;
            data[field.name] = field.value;
        }
        // submit
        if (!isValid) {
            // set form status
            this.formStatusHandler({
                status: 'error',
                msg: 'Please make sure you enter all the required fields with correct information!'
            });
        } else {
            this.formStatusHandler({
                status: 'loading',
                msg: 'Submitting...'
            }, true);
            axios.get('/contact.php', {
                params: data
            }).then(response => {
                form.reset();
                // set form status
                this.formStatusHandler({
                    status: 'success',
                    msg: 'Thanks for submitting the inquiry! I will be reaching out to you soon.'
                });
            }).catch(error => {
                // set form status
                this.formStatusHandler({
                    status: 'error',
                    msg: error.response.data.message
                });
            });
        }
    };

    render() {
        const data = this.props.data;
        return (
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
                <section id="portfolio">
                    <div className="container">
                        <h2>Portfolio</h2>
                        <div className="filters">
                            <ul>
                                <li className="active"><a href="?type=All">All</a></li>
                                {
                                    data.portfolio.edges
                                        .reduce((prev, cur) => {
                                            const type = cur.node.frontmatter.type;
                                            return prev.indexOf(type) !== -1 ? prev : prev.concat(type);
                                        }, [])
                                        .sort()
                                        .map(e =>
                                            <li key={e}><a href={'?type=' + encodeURIComponent(e)}>{e}</a></li>
                                        )
                                }
                            </ul>
                        </div>
                        <ul className="portfolio-cards">
                            {
                                data.portfolio.edges.map(e => {
                                    const meta = e.node.frontmatter;
                                    const thumb = data.portfolioThumbnails.edges.filter(k => k.node.name === [meta.category, meta.id].join('.'));
                                    return <Card
                                        key={meta.id}
                                        id={meta.id}
                                        title={meta.title}
                                        blurb={meta.blurb}
                                        thumbnail={thumb.length ? thumb[0].node.childImageSharp.fluid : null}
                                    />;
                                })
                            }
                        </ul>
                    </div>
                </section>
                <section id="contact">
                    <div className="contact-background">
                        <div className="contact-map"><Img fluid={data.contact.childImageSharp.fluid}/></div>
                    </div>
                    <div className="container">
                        <div className="contact-card">
                            <h2>Contact</h2>
                            <p>Feel free to leave me a message below. You can also reach me at <a
                                href="mailto:contact@dashengz.com">contact@dashengz.com</a>.</p>
                            <div className="contact-form">
                                <form name="contact-form">
                                    <div className="form-row">
                                        <label><span className="sr-only">Name</span>
                                            <input type="text" name="name" required placeholder="Name"/>
                                        </label>
                                        <label><span className="sr-only">Email</span>
                                            <input type="email" name="email" required placeholder="Email"/>
                                        </label>
                                    </div>
                                    <div className="form-row">
                                        <label><span className="sr-only">Message</span>
                                            <textarea name="message" required placeholder="Message"/>
                                        </label>
                                    </div>
                                    <div className="form-submit">
                                        <button type="button" className="btn btn-primary" onClick={e => this.formSubmitHandler(e)}>Submit
                                        </button>
                                    </div>
                                </form>
                                {
                                    this.state.formStatus ? (<div className={'form-status ' + this.state.formStatus}>
                                        <div>
                                            <div><i
                                                className={
                                                    'icon icon-' +
                                                    (this.state.formStatus === 'success' ? 'checkmark' :
                                                        this.state.formStatus === 'loading' ? 'spinner' : 'cross')
                                                }
                                                aria-hidden="true"/></div>
                                            <div>{this.state.formStatusMessage}</div>
                                        </div>
                                    </div>) : null
                                }
                            </div>
                        </div>
                    </div>
                </section>
            </Layout>
        );
    }
}

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
        portfolio: allMarkdownRemark(
            filter: {
                frontmatter: {
                    category: { eq: "portfolio" }
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
                        type
                        sequence
                        title
                        blurb
                    }
                    html
                }
            }
        }
        portfolioThumbnails: allFile(filter: {relativePath: { regex: "/portfolio(.*)png/" }}) {
            edges {
                node {
                    name
                    childImageSharp {
                        fluid(maxWidth: 600) {
                            ...GatsbyImageSharpFluid
                        }
                    }
                }
            }
        }
        contact: file(relativePath: { eq: "contact-map.png" }) {
            childImageSharp {
                fluid(maxWidth: 1500) {
                    ...GatsbyImageSharpFluid
                }
            }
        }
    }
`;

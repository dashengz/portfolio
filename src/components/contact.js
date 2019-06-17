import React, {Component} from 'react';
import Img from "gatsby-image";
import {graphql, StaticQuery} from "gatsby";
import axios from "axios";

class Contact extends Component {
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
        return (
            <section id="contact">
                <div className="contact-background">
                    <div className="contact-map">
                        <StaticQuery
                            query={graphql`
                                query {
                                    contact: file(relativePath: { eq: "contact-map.png" }) {
                                        childImageSharp {
                                            fluid(maxWidth: 1500) {
                                                ...GatsbyImageSharpFluid
                                            }
                                        }
                                    }
                                }
                            `}
                            render={data => (
                                <Img fluid={data.contact.childImageSharp.fluid}/>
                            )}/>
                    </div>
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
                                    <button type="button" className="btn btn-primary"
                                            onClick={e => this.formSubmitHandler(e)}>Submit
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
        );
    }
}

export default Contact;
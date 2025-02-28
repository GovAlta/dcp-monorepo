import React from 'react';
import hero_mobile from '../../img/hero-mobile-tablet.svg';
import './styles.css';

const ContactPage = () => {
    return (
        <>
            <div className="goa-adm-body-header goa-adm-body-full">
                <div className="container">
                    <div className="goa-adm-body-header-content">
                        <div className="goa-adm-breadcrumbs">
                            <ul>
                                <li>
                                    <a href="/">Home</a>
                                </li>
                                <li className="goa-adm-breadcrumbs-active">
                                    Contact
                                </li>
                            </ul>
                        </div>
                        <h1>Contact</h1>
                    </div>

                    <div className="goa-adm-body-header-graphic">
                        <div className="goa-adm-home-tablet-graphic">
                            <img
                                src={hero_mobile.src}
                                alt="Illustration of Alberta's landscape"
                            />
                        </div>
                        <div className="goa-adm-body-full-middle"></div>
                        <div className="goa-adm-body-full-side-two"></div>
                    </div>
                </div>
            </div>

            <div className="goa-adm-body" id="main">
                <div className="container">
                    <section className="goa-adm-contact goa-adm-center-aligned">
                        <h2>
                            Let's build a digital future of public services
                            together!
                        </h2>
                        <p>
                            Connect with us at{' '}
                            <a href="mailto:digital.outreach@gov.ab.ca">
                                digital.outreach@gov.ab.ca
                            </a>
                        </p>
                        <p>
                            <strong>Hours:</strong>
                            <br />
                            Monday to Friday from 8:30am - 4:00pm
                        </p>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ContactPage;

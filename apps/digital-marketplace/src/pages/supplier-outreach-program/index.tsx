import React from 'react';
import Header from './header';
import ApptForm from './ApptForm';
import appointment_thumb from '../../img/icon-appointment.svg';
import understanding_thumb from '../../img/icon-understanding-procurement.svg';
import coming_thumb from '../../img/icon-coming-soon.svg';
import BackToTop from '../../components/back-to-top';

const ProcurementConciergePage = () => {
  
    return (
        <>
        <Header />
        <div className="goa-adm-body" id="main">
            <div className="container">
                <section className="goa-adm-intro">
                    <h2>Get the support you need</h2>
                    <p>
                        Navigating government procurement can be complex for technology suppliers, especially small and medium-sized enterprises. Whether you are new to government procurement or need assistance with specific inquiries, the Supplier Outreach Program is designed to:
                    </p>
                    <ul>
                        <li>Provide dedicated 1-on-1 support, webinars, and resources to help you understand government procurement.</li>
                        <li>Offer personalized guidance on topics like general rules around procurement and high-level insights into how the government ensures fairness and transparency in its procurement practices.</li>
                        <li>Help you engage in government opportunities, navigate procurement processes, and facilitate connections with business areas in Technology and Innovation and relevant ministry program areas.</li>
                        <li>Highlight our upcoming digital transformation priorities.</li>
                    </ul>
                    <p>There is no cost or membership required to participate in this program.</p>
                </section>

                <section className="goa-adm-cards-info">
                    <h2>Program features</h2>
                    <div className="goa-adm-cards">
                        <div className="goa-adm-single-card">
                            <div className="goa-adm-single-card-thumb">
                            <img src={appointment_thumb.src} alt="Book an appoinement icon" />
                            </div>
                            <h3>Consult an advisor</h3>
                            <div className="goa-adm-single-card-content">
                            <p>
                                Easily schedule one-on-one appointments with our advisors to get general guidance and access helpful resources.
                            </p>
                            </div>
                            <div className="goa-adm-single-card-link">
                            <a
                                className="goa-adm-button-link goa-adm-secondary"
                                href="#get-started"
                            >
                                Book a consultation
                            </a>
                            </div>
                        </div>
                        <div className="goa-adm-single-card">
                            <div className="goa-adm-single-card-thumb">
                            <img src={understanding_thumb.src} alt="Understanding procurement icon" />
                            </div>
                            <h3>Procurement guidance</h3>
                            <div className="goa-adm-single-card-content">
                            <p>
                                Access resources designed to enhance your understanding of government procurement and our upcoming digital transformation priorities.
                            </p>
                            </div>
                            <div className="goa-adm-single-card-link">
                            <a
                                className="goa-adm-button-link goa-adm-secondary"
                                href="/understanding-procurement/"
                            >
                                Procurement in GoA
                            </a>
                            </div>
                        </div>
                    </div>
                    <div className="goa-adm-coming-soon">
                        <div className="goa-adm-coming-soon-container">
                            <div className="goa-adm-coming-soon-icon">
                                <img src={coming_thumb.src} alt="Webinars coming soon icon" />
                            </div>
                            <div className="goa-adm-coming-soon-content">
                                <h3>Live webinars</h3>
                                <p>
                                    Join us live or view our recorded sessions to learn about procurement processes and gain insights into our upcoming digital transformation projects.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="get-started" className="goa-adm-concierge-appointment">
                    <h2>Get started</h2>
                    <p>Please fill out this form to request an initial consultation with an advisor. The advisors will not discuss or offer assistance for any past, present or future procurement opportunities listed on the Alberta Purchasing Connection (APC).</p>
                    <p>By submitting this form, you agree to share your information with the Government of Alberta.</p>
                </section>

                <ApptForm />

                <div className="goa-adm-appt-callout">
                    <p>Disclaimer: Participating in this program does not influence or guarantee the outcome of any solicitation process. All procurement decisions are made in accordance with established guidelines and evaluation criteria, ensuring fairness, and transparency for all participants.</p>
                </div>
            </div>
        </div>
        <BackToTop />
        </>
  );
};
export default ProcurementConciergePage;
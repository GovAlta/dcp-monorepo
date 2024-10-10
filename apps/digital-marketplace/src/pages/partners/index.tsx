import React from 'react';
import PartnersHeader from './header';
import SignupForm from './signupForm';

export default function PartnersPage() {
  return (
    <>
      <PartnersHeader />
      <div className="goa-adm-body">
        <div className="container">
          <section className="goa-adm-benefits">
            <h2>Benefits for a community partners</h2>
            <ul>
              <li>
                Stay informed about the digital transformation initiatives in
                the public sector.
              </li>
              <li>
                Gain visibility and traction in the public sector and technology
                industry by attending events.
              </li>
            </ul>
          </section>

          <section className="goa-adm-expect">
            <h2>What to expect</h2>
            <div className="goa-adm-timeline">
              <ul className="progressbar">
                <li>
                  <div className="goa-adm-timeline-label">
                    <h3>Sign up</h3>
                  </div>

                  <div className="goa-adm-timeline-desc">
                    <p>
                      Join our mailing list by sharing details about your
                      organization.
                    </p>
                  </div>
                </li>

                <li>
                  <div className="goa-adm-timeline-label">
                    <h3>Stay updated</h3>
                  </div>

                  <div className="goa-adm-timeline-desc">
                    <p>
                      Start receiving updates about new programs, vendor events,
                      stakeholder engagements and more.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>

          <section id="sign-up-form" className="goa-adm-sign-up-form">
            <h2>Community partner sign-up form</h2>

            <div className="goa-adm-form-container">
              <SignupForm />

              <div className="goa-adm-disclaimer">
                <p>
                  The information you provide is being collected under section
                  33(c) of the{' '}
                  <a
                    href="https://open.alberta.ca/publications/f25"
                    target="_blank"
                  >
                    <em>
                      Freedom of Information and Protection of Privacy (FOIP)
                      Act
                    </em>
                  </a>{' '}
                  and will be protected under the provisions of the Act.
                  Questions regarding the collection, use and disclosure may be
                  directed to [program area contact info here].
                </p>
              </div>

              <div className="goa-adm-recaptcha">
                <p>
                  Protected by reCAPTCHA:
                  <br />
                  <a href="https://www.google.com/intl/en/policies/privacy/">
                    Privacy
                  </a>
                  <span>-</span>
                  <a href="https://www.google.com/intl/en/policies/terms/">
                    Terms
                  </a>
                </p>
              </div>
            </div>
          </section>

          <section
            id="successDiv"
            className="goa-adm-sign-up-form goa-adm-form-success"
          >
            <div className="goa-adm-form-container">
              <form>
                <h3>Thank you for signing up!</h3>
                <p>
                  Visit Alberta Purchasing Connection to explore digital
                  opportunities.
                </p>
                <a
                  className="goa-adm-button-link"
                  href="https://purchasing.alberta.ca/search"
                  target="_blank"
                >
                  Explore opportunities
                </a>
              </form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

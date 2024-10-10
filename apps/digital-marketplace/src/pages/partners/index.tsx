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

          <SignupForm />
        </div>
      </div>
    </>
  );
}

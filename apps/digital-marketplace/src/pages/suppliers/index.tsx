import React from 'react';
import Header from './header';
import SignupForm from './signupForm';

export default function SuppliersPage() {
  return (
    <>
      <Header />

      <div className="goa-adm-body">
        <div className="container">
          <section className="goa-adm-benefits">
            <h2>Benefits for a supplier</h2>
            <ul>
              <li>
                Network, attend vendor showcase events and other stakeholder
                engagements to increase visibility and reach within the public
                sector.
              </li>
              <li>
                Demonstrate your strengths and capabilities to attract buyers,
                build connections and convert them into long-term partnerships.
              </li>
              <li>
                Engage with us on various initiatives to deliver programs that
                meet the needs of Albertans.
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
                    <h3>Connect</h3>
                  </div>

                  <div className="goa-adm-timeline-desc">
                    <p>
                      After you sign up, we will reach out to learn more about
                      your digital offerings.
                    </p>
                  </div>
                </li>

                <li>
                  <div className="goa-adm-timeline-label">
                    <h3>Engage</h3>
                  </div>

                  <div className="goa-adm-timeline-desc">
                    <p>
                      Start receiving latest news and updates about initiatives
                      tailored to your expertise.
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

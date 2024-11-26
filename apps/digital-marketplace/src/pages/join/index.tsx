import React from 'react';
import Header from './header';
import SignupForm from './signUpForm';

export default function JoinPage() {
  return (
    <>
      <Header />

      <div className="goa-adm-body" id="main">
        <div className="container">
          <section className="goa-adm-join-intro">
            <p>Join Alberta's Digital Marketplace as a provider of innovative solutions or a community partner.</p>
          </section>

          <section className="goa-adm-expect">
            <h2>Benefits for a supplier</h2>
            <p>Increase your visibility and reach within the public sector and demonstrate your strengths and capabilities by:</p>
            <ul>
              <li>
                Attending vendor showcases and networking events
              </li>
              <li>
                Attracting buyers, building connections and converting them into long-term partnerships
              </li>
              <li>
                Collaborating with us to deliver programs that meet the need of Albertans.
              </li>
            </ul>
          </section>
          <SignupForm />

        </div>
      </div>
    </>
  );
}

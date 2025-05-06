/* eslint-disable prettier/prettier */
import React from 'react';
import Header from './header';
import ProcessAccordion from './ProcessAccordion';
import ChallengeCards from './ChallengesCards';
import funded_thumb from '../../img/funded-challenges.svg';

export default function ChallengePage() {
  return (
    <>
      <Header />

      <div className="goa-adm-body" id="main">
        <div className="container">
            <section className="goa-adm-openings">
                <h2>Current open challenges</h2>
                
                <div className="goa-adm-cards-section">
                    <ChallengeCards />
                </div>
            </section>

            <section className="goa-adm-process">
                <h2>How the Challenge-Based Procurement Process works:</h2>
                <div className="goa-adm-accordion">
                    <ProcessAccordion />
                </div>
                <h3>Why Challenge-Based Procurement?</h3>
                <p>Challenge-Based Procurement provides an exciting new way for the Government of Alberta (GoA) to find innovative solutions by inviting suppliers to respond to problem statements rather than detailed requirements. Unlike traditional Request for Proposal (RFP) processes, this approach fosters creativity and collaboration to develop solutions that meet our needs in more effective and efficient ways.</p>
            </section>

            <div className="goa-adm-funded">
              <div className="goa-adm-funded-container">
                <div className="goa-adm-funded-icon">
                  <img src={funded_thumb.src} alt="Webinars coming soon icon" />
                </div>
                <div className="goa-adm-funded-content">
                  <h3>Funded Challenges</h3>
                  <p>
                    Follow the progress of our innovative procurement process and discover the successful suppliers at each phase.
                  </p>
                  <div className="goa-adm-single-card-link">
                    <a className="goa-adm-button-link goa-adm-secondary" href="/funded-challenges/">View funded challenges</a>
                  </div>
                </div>
              </div>
            </div>
        </div>
      </div>
    </>
  );
}

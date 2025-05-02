/* eslint-disable prettier/prettier */
import React from 'react';
import Header from './header';
import FundedAccordion from './FundedAccordion';

export default function ChallengePage() {
  return (
    <>
      <Header />

      <div className="goa-adm-body" id="main">
        <div className="container">
            <section className="goa-adm-intro">
                <p>Follow the progress of our innovative procurement process and discover the successful suppliers at each phase:</p>
            </section>
            <section className="goa-adm-process">
                <h2>Phase 1: Proof of Concept</h2>
                <div className="goa-adm-accordion">
                    <FundedAccordion />
                </div>
            </section>
            
            <section className="goa-adm-process">
                <h2>Phase 2: Prototype Solution</h2>
                <div className="goa-adm-accordion">
                    <FundedAccordion />
                </div>
            </section>
        </div>
      </div>
    </>
  );
}

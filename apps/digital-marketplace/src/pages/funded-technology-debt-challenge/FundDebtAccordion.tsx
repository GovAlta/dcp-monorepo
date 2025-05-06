import React from 'react';
import Accordion from '../../components/accordion';

const FundDebtAccordion = () => {
  return (
    <>
      <Accordion
        title="Phase 0: Explore the problem"
        content={
          <>
            <ul>
              <li>
                We're hosting an online forum for technology innovators and
                starting with big questions: how can we remediate legacy
                systems? How can we modernize without disrupting essential
                services?
              </li>
              <li>
                Innovators are invited, through an expression of interest (EOI),
                to submit their ideas or concepts focused on technology debt
                reduction.
              </li>
              <li>
                We will review the themes of the submission and select the
                themes we want to address now!
              </li>
            </ul>
          </>
        }
      />

      <Accordion
        title="Phase 1: Proof of Concept"
        content={
          <ul>
            <li>
              We will put out a call inviting the innovators to provide concept
              proposals demonstrating their alignment with the selected theme
              and GoA's IT infrastructure.
            </li>
            <li>
              Funding of $50K will be provided to shortlisted innovators based
              on the evaluation criteria posted in the solicitation guide.
            </li>
          </ul>
        }
      />

      <Accordion
        title="Phase 2: Prototype Development"
        content={
          <ul>
            <li>
              Shortlisted innovators will move to this phase and invited to
              develop a working prototype that showcases the proposed solution's
              functionality and relevance to GoA's identified challenges.
            </li>
            <li>
              Funding of up to $100K will be provided to develop the prototype,
              with technical validation and iterative feedback.
            </li>
            <li>
              The prototype will be assessed for solution viability, technical
              fit and potential scalability.
            </li>
          </ul>
        }
      />

      <Accordion
        title="Phase 3: Procurement Pathway"
        content={
          <p>
            Innovators with successful prototypes may be invited to participate
            in a subsequent procurement process (eg: negotiated request for
            proposal, invitational tender, or other strategy) that is best
            suitable to adopt and scale the solution within the GoA, in
            alignment with trade agreements and procurement policies.
          </p>
        }
      />
    </>
  );
};
export default FundDebtAccordion;

import React from 'react';
import Accordion from '../../components/accordion';

const ProcessAccordion = () => {
  return (
    <>
      <Accordion
        title="Phase 0: Explore the problem"
        content={
          <>
            <ul>
              <li>
                Each challenge follows a multi-phase process. We start with a
                problem statement, high-level requirements, and evaluation
                criteria.
              </li>
              <li>
                Suppliers submit proposals meeting all mandatory requirements.
              </li>
              <li>
                Top candidates move to Phase 1 to deliver a proof of concept.
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
              Shortlisted suppliers develop and deliver their proof of concept.
            </li>
            <li>Deliverables are evaluated against predefined criteria.</li>
            <li>
              High performers advance to Phase 2 for prototype development.
            </li>
          </ul>
        }
      />

      <Accordion
        title="Phase 2: Prototype Development"
        content={
          <ul>
            <li>Suppliers build a refined prototype.</li>
            <li>
              The GoA selects a lead proponent based on the best prototype.
            </li>
          </ul>
        }
      />

      <Accordion
        title="Phase 3: Procurement Pathway"
        content={
          <p>
            Lead prototype(s) will be assessed for alignment with challenge
            requirements and a suitable procurement vehicle developed. Options
            may include a direct award (where permitted), invitational
            competitive process or open competitive procurement conducted in
            compliance with applicable trade agreements, procurement legislation
            and internal policies.
          </p>
        }
      />
    </>
  );
};
export default ProcessAccordion;

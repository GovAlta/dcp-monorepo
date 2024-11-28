import React from 'react';
import Accordion from '../../components/accordion';

const DifferentWaysAccordion = () => {
    return (
        <>
        <Accordion title="Open Solicitation" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> Open solicitations are competitive procurement processes available to all suppliers. They are posted on the Alberta Purchasing Connection (APC) to ensure compliance, wide access, and foster competition.</li>
                <li><strong>When:</strong> Open solicitation is required when the procurement value meets or exceeds thresholds set by Trade Agreements (see above). It is typically for goods valued at or above $10,000 and services valued at or above $75,000. </li>
                <li><strong>How:</strong> The solicitation documents are accessible to all interested suppliers, including specifications, terms, conditions, and submission requirements and provide comprehensive details. Responses are evaluated based on established criteria without preference for a specific supplier. Contracts are awarded to the supplier whose submission offers the best value based on the established criteria.</li>
            </ul>
        } />
        
        <Accordion title="Limited Solicitation" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> “Limited Solicitation” means a solicitation where a pre-determined, limited group of vendors are invited to submit a Response. Limited solicitations can be issued in various ways, including invitations to bid or as a Statement of Work (SOW) under a Pre-Qualification Request (PQR).
                <span className="list-note"><strong>NOTE:</strong> The Pre-Qualification Requests are open competitions available to all suppliers who meet the qualifications. The resulting SOWs are limited competitions issued to the qualified suppliers.</span></li>
                <li><strong>When:</strong> Invitations to bid can be used for procurements under $75,000. PQR can be established for goods and services of any value, and the resulting SOW can be issued for any in scope goods and services.</li>
                <li><strong>How:</strong> Review the PQRs posted on APC, when you see a potential fit, apply! Getting on a pre-qualification list means that you are eligible to submit proposals to provide future services or goods as opportunities arise under the PQR.</li>
            </ul>
        } />
        
        <Accordion title="Supply Arrangements" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> These are open solicitations that establish agreements for frequently purchased goods or services, with set terms and pricing.</li>

                <li><strong>When:</strong> Suitable for ongoing needs, such as office supplies or IT services, where departments can quickly purchase from existing catalogs or agreements.</li>

                <li><strong>How:</strong> Managed by Service Alberta and Red Tape Reduction (SARTR) or Technology and Innovation (TI), these arrangements streamline procurement by allowing departments to purchase directly from pre-negotiated contracts (standing offer)</li>
            </ul>
        } />
        
        <Accordion title="Sole-Source" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> A sole source occurs when a contract is awarded to a single supplier without a competitive process. This approach is typically restricted but occurs under defined conditions</li>

                <li><strong>When:</strong> Appropriate when specific criteria are met, such as
                    <ul>
                        <li>For services valued at less than $10,000</li>
                        <li>For construction-related goods or services valued at less than $50,000.</li>
                        <li>When Trade Exceptions apply for a situation of unforeseen urgency, unique capability or compatibility.</li>
                    </ul>
                </li>

                <li><strong>How:</strong> Where possible, suppliers should be selected from approved lists maintained by SARTR or their own Contract Review Committee (CRC) when applicable. The departments select suppliers based on merit and value to the government (crown). Sole sourcing requires a Deputy Minister's authorization and must be publicly disclosed quarterly.</li>
            </ul>
        } />
        
        <Accordion title="Emergency Procurement" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> This allows for immediate procurement to address urgent and unforeseen needs (e.g., personal protective equipment during a pandemic), bypassing standard competitive processes.</li>
                <li><strong>When:</strong> Used during emergencies or when there is a critical need to prevent harm to public safety or health</li>
                <li><strong>How:</strong> Departments are given the authority to act swiftly, but they must document and justify the urgency.</li>
            </ul>
        } />
        </>
    );
};

export default DifferentWaysAccordion;

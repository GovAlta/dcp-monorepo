import React from 'react';
import Accordion from '../../components/accordion';

const DifferentWaysAccordion = () => {
    return (
        <>
        <Accordion title="Open Solicitation" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> Open solicitations are competitive procurement processes available to all suppliers. They are posted on the Alberta Purchasing Connection (APC) to ensure wide access. Open solicitation is typically for goods valued at (or above) $10,000 and services valued at (or above) $75,000. </li>
                <li><strong>When:</strong> Best for high-value procurements, where significant competition is desired.</li>
                <li><strong>How:</strong> The solicitation documents are accessible to all interested suppliers, including specifications, terms, conditions, and submission requirements and provide comprehensive details. Responses are evaluated based on established criteria without preference for a specific supplier. Contracts are awarded to the supplier whose submission offers the best value based on the established criteria.</li>
            </ul>
        } />
        
        <Accordion title="Limited Solicitation" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> There are two types of limited solicitations:
                    <ol>
                        <li>A solicitation issued to a set of suppliers chosen by the Government of Alberta.  </li>
                        <li>A statement of work issued to a set of suppliers prequalified under an openly competed Pre-Qualification Request (PQR). </li>
                    </ol>
                </li>
                <li><strong>When:</strong> Type 1 is most often used for procurements under $75,000. Type 2 is used when a Pre-Qualification Request exists for a defined set of goods or services.</li>
                <li><strong>How:</strong> Review the PQRs posted on APC, when you see a potential fit, apply! Getting on the PQR list means that you are eligible to provide future services or goods under the PQR.</li>
            </ul>
        } />
        
        <Accordion title="Supply Arrangements" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> These are open solicitations that establish agreements for frequently purchased goods or services, with set terms and pricing.</li>

                <li><strong>When:</strong> Suitable for ongoing needs, such as office supplies or IT services, where departments can quickly purchase from existing catalogs or agreements.</li>

                <li><strong>How:</strong> Managed by Service Alberta and Red Tape Reduction (SARTR) or Technology and Innovation (TI), these arrangements streamline procurement by allowing departments to purchase directly from pre-negotiated contracts (standing offer).</li>
            </ul>
        } />
        
        <Accordion title="Sole-Source" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> These are open solicitations that establish agreements for frequently purchased goods or services, with set terms and pricing.</li>

                <li><strong>When:</strong> Suitable for ongoing needs, such as office supplies or IT services, where departments can quickly purchase from existing catalogs or agreements.</li>

                <li><strong>How:</strong> Managed by Service Alberta and Red Tape Reduction (SARTR) or Technology and Innovation (TI), these arrangements streamline procurement by allowing departments to purchase directly from pre-negotiated contracts (standing offer).</li>
            </ul>
        } />
        
        <Accordion title="Emergency Procurement" content={
            <ul className="no-list-bullet">
                <li><strong>What:</strong> This allows for immediate procurement to address urgent and unforeseen needs (e.g., pandemic), bypassing standard competitive processes.</li>
                <li><strong>When:</strong> Used during emergencies or when there is a critical need to prevent harm to public safety or health.</li>
                <li><strong>How:</strong> Departments are given the authority to act swiftly, but they must document and justify the urgency.</li>
            </ul>
        } />
        </>
    );
};

export default DifferentWaysAccordion;
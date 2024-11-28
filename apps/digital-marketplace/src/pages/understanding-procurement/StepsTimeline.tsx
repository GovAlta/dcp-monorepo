import React from 'react';
import Timeline from '../../components/timeline';

const StepsTimeline = () => {
    return (
        <>
            <Timeline number={1} heading="Register or sign in on APC" content={
                <>
                <p>Go to the <a href="https://purchasing.alberta.ca/" target="_blank">APC website</a> and sign in to your account. If you have not registered yet, you must do so to access and download requests for proposals (RFPs), requests for quotes (RFQ), pre-qualification requests (PQRs), and other details for procurement opportunities.</p>
                <p>APC is the official platform for viewing and downloading solicitation documents.</p>
                </>
            }/>

            <Timeline number={2} heading="Browse opportunities" content={
                <>
                <p>Browse opportunities relevant to the products or services offered by your organization. Use the filters to narrow down the list of available tenders. Refer to the <a href="https://canadabuys.canada.ca/en/tender-opportunities/commodity-codes" target="_blank">UNSPCS codes</a> here to filter using UNSPCS code.</p>
                </>
            }/>

            <Timeline number={3} heading="Respond to opportunities" content={
                <>
                <p><strong>Review details</strong></p>
                <ol>
                    <li>Click on each opportunity to explore the scope, requirements, timelines, and evaluation criteria.</li>
                    <li>Download any associated documents such as Requests for Proposals (RFPs), Requests for Information (RFIs), or Pre-Qualification Requests (PQRs) to fully understand the opportunity.</li>
                    <li>Questions related to the opportunity should be addressed to the contact person listed in the solicitation document.</li>
                </ol>
                
                <p><strong>Prepare and submit a response</strong></p>
                <ol>
                    <li>Develop a response that clearly addresses all provisions (mandatory and desirable) and showcases your organization's ability to fulfill the contract. While suppliers may have a strong sales pitch, the GoA requires that all responses meet specific evaluation criteria to ensure a fair and consistent evaluation. Be sure to develop a proposal that addresses each provision accordingly.</li>
                    <li>Ensure that all necessary documentation is included, such as pricing, timelines, certifications, or additional materials requested. Review your response for clarity, spelling, grammar, and accuracy.</li>
                    <li>Ensure your response complies with the required format, page limits, and submission methods. Follow the submission instructions provided in the solicitation document and send your response to the email address provided before the closing deadline.</li>
                </ol>
                
                <p><strong>Track your submission</strong></p>
                <ol>
                    <li>After submission, responses go through an initial screening to ensure they meet the administrative, functional and technical mandatory requirements described in the solicitation.</li>
                    <li>Compliant responses are then evaluated based on the criteria defined in the solicitation - this includes both mandatory and desirable provisions</li>
                    <li>Shortlisted responses may be invited for presentations or further discussions.</li>
                    <li>Once the evaluation is complete, the GoA makes an award decision.</li>
                </ol>
                </>
            }/>

            <Timeline number={4} heading="Sign the contract" content={
                <>
                <p><strong>Receive notification of award</strong></p>
                <p>If selected, you will be notified of the decision by the ministry. Review the award notification and any associated documents.</p>

                <p><strong>Finalize the contract</strong></p>
                <p>The GoA may contact you to discuss specific contract terms. Ensure that you understand all terms and conditions and ask for clarification if needed.</p>
                
                <p><strong>Sign the contract</strong></p>
                <p>Sign the contract as instructed, which will finalize your relationship with the GoA as a supplier.</p>
                </>
            }/>
        </>
    )
};

export default StepsTimeline;

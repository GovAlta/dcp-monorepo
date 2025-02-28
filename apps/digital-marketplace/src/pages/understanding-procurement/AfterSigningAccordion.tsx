import React from 'react';
import Accordion from '../../components/accordion';

const AfterSigningAccordion = () => {
    return (
        <>
            <Accordion
                title="Supplier enablement"
                content={
                    <p>
                        You may need to complete additional steps to finalize
                        your supplier status, like submitting compliance
                        documents or setting up payment details. If you aren’t
                        already, register to the SAP Ariba/Business network.
                        There is no cost to suppliers when doing business with
                        the GoA in SAP Business Network in 1GX.
                    </p>
                }
            />

            <Accordion
                title="Receive and confirm purchase orders"
                content={
                    <ol>
                        <li>
                            <strong>Receive Purchase Orders (POs)</strong>
                            <br />
                            You will receive POs related to your contract via
                            email. Review the POs carefully and confirm receipt
                            to initiate the order fulfillment process. Click on
                            the “
                            <a
                                href="https://www.alberta.ca/system/files/custom_downloaded_images/sa-quick-start-guide-for-ariba-network.pdf"
                                target="_blank"
                            >
                                Process Order
                            </a>
                            ” in your PO to log in or sign up for SAP Business
                            Network.
                        </li>
                        <li>
                            <strong>Fulfill the order</strong>
                            <br />
                            Begin delivering goods or services as per the
                            contract specifications and agreed-upon timelines.
                        </li>
                    </ol>
                }
            />

            <Accordion
                title="Invoicing and payments"
                content={
                    <ol>
                        <li>
                            Upon delivery completion, submit an invoice through
                            SAP Ariba, the application in 1GX that processes
                            orders, invoices, and payments (or as instructed in
                            the contract).
                        </li>
                        <li>
                            Ensure your invoice is accurate and matches the PO,
                            including itemized charges, quantities, and any
                            other required details.
                        </li>
                        <li>
                            Use the{' '}
                            <a
                                href="https://support.ariba.com/item/view/194879"
                                target="_blank"
                            >
                                1GX supplier information portal
                            </a>{' '}
                            to learn more and get started in SAP Business
                            Network
                        </li>
                        <li>
                            Please follow up with GoA's payment department
                            through the contact information provided in the
                            contract if you face any issues with payment.
                        </li>
                    </ol>
                }
            />
        </>
    );
};
export default AfterSigningAccordion;

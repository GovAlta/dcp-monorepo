import React from 'react';
import Accordion from '../../components/accordion';

interface FundedProps {
  innovator: string;
  location: string;
  date: string;
  amount: string;
  link: string;
}

const Funded: React.FC<FundedProps> = ({
  innovator,
  date,
  location,
  amount,
  link,
}) => {
  return (
    <>
      <div className="goa-adm-funded-info">
        <div className="goa-adm-funded-innovator">
          <p>
            <strong>Innovator:</strong>
          </p>
          <p>{innovator}</p>
        </div>

        <div className="goa-adm-funded-location">
          <p>
            <strong>City, Province or Territory:</strong>
          </p>
          <p>{location}</p>
        </div>

        <div className="goa-adm-funded-date">
          <p>
            <strong>Award date:</strong>
          </p>
          <p>{date}</p>
        </div>

        <div className="goa-adm-funded-amount">
          <p>
            <strong>Awarded amount: </strong>
            <em>(*applicable taxes included)</em>
          </p>
          <p>{amount}</p>
        </div>
      </div>
      <div className="goa-adm-single-card-link">
        <a className="goa-adm-button-link goa-adm-secondary" href={link}>
          View funded challenge
        </a>
      </div>
    </>
  );
};

const FundedAccordion = () => {
  return (
    <>
      <Accordion
        title="Technology Debt Challenge"
        content={
          <Funded
            innovator="Name of innovator"
            location="Edmonton, AB"
            date="April 30, 2025"
            amount="$200,000"
            link="/funded-technology-debt-challenge/"
          />
        }
      />

      <Accordion
        title="Phase 1: Proof of Concept"
        content={
          <ol>
            <li>
              <strong>Receive Purchase Orders (POs)</strong>
              <br />
              You will receive POs related to your contract via email. Review
              the POs carefully and confirm receipt to initiate the order
              fulfillment process. Click on the “
              <a
                href="https://www.alberta.ca/system/files/custom_downloaded_images/sa-quick-start-guide-for-ariba-network.pdf"
                target="_blank"
              >
                Process Order
              </a>
              ” in your PO to log in or sign up for SAP Business Network.
            </li>
            <li>
              <strong>Fulfill the order</strong>
              <br />
              Begin delivering goods or services as per the contract
              specifications and agreed-upon timelines.
            </li>
          </ol>
        }
      />

      <Accordion
        title="Phase 2: Prototype Development"
        content={
          <ol>
            <li>
              Upon delivery completion, submit an invoice through SAP Ariba, the
              application in 1GX that processes orders, invoices, and payments
              (or as instructed in the contract).
            </li>
            <li>
              Ensure your invoice is accurate and matches the PO, including
              itemized charges, quantities, and any other required details.
            </li>
            <li>
              Use the{' '}
              <a
                href="https://support.ariba.com/item/view/194879"
                target="_blank"
              >
                1GX supplier information portal
              </a>{' '}
              to learn more and get started in SAP Business Network
            </li>
            <li>
              Please follow up with GoA's payment department through the contact
              information provided in the contract if you face any issues with
              payment.
            </li>
          </ol>
        }
      />

      <Accordion
        title="Phase 3: Procurement Pathway"
        content={
          <ol>
            <li>
              Upon delivery completion, submit an invoice through SAP Ariba, the
              application in 1GX that processes orders, invoices, and payments
              (or as instructed in the contract).
            </li>
            <li>
              Ensure your invoice is accurate and matches the PO, including
              itemized charges, quantities, and any other required details.
            </li>
            <li>
              Use the{' '}
              <a
                href="https://support.ariba.com/item/view/194879"
                target="_blank"
              >
                1GX supplier information portal
              </a>{' '}
              to learn more and get started in SAP Business Network
            </li>
            <li>
              Please follow up with GoA's payment department through the contact
              information provided in the contract if you face any issues with
              payment.
            </li>
          </ol>
        }
      />
    </>
  );
};
export default FundedAccordion;

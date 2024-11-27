import React from 'react';
import Header from './header';
import { GoASkeleton } from "@abgov/react-components";
import DifferentWaysAccordion from './differentWaysAccordion';
import AfterSigningAccordion from './afterSigningAccordion';
import StepsTimeline from './stepsTimeline';
import suppliers_thumb from '../../img/supplier-icon-home.svg';
import buyers_thumb from '../../img/buyers-icon-home.svg';
import TableOfContents from '../../components/table-of-contents';
import BackToTop from '../../components/back-to-top';

const UnderstandingProcurementPage = () => {
  
  return (
    <>
      <Header />
      <div className="goa-adm-body goa-adm-procurement" id="main">
        <div className="container">
          <div className="goa-adm-procurement-content">
            <section className="goa-adm-procurement-trade">
              <h2 id="procurement-trade">GoA procurement policies and trade agreements</h2>
              <h3 id="accountability-framework">Procurement Accountability Framework (PAF)</h3>
              <p>The <a href="https://open.alberta.ca/publications/procurement-accountability-framework-manual-2018#detailed" target="_blank">Procurement Accountability Framework (PAF)</a> provides guidelines for GoA procurement and aims to:</p>
              <ul>
                <li>Enhance transparency and fairness in the GoA procurement process.</li>
                <li>Increase consistency in contracting activities.</li>
                <li>Provide controls and shared values.</li>
                <li>Expand rigour and accountability in ministry procurement processes.</li>
              </ul>

              <h3 id="trade-agreements">Trade agreements</h3>
              <p>Suppliers looking to do business with the GoA are subject to several <a href="https://www.alberta.ca/alberta-trade-agreements" target="_blank">Trade Agreements</a> that establish the rules and guidelines for procurement. These agreements aim to promote fair competition, ensure transparency, and create a level playing field for suppliers across various jurisdictions.</p>

              <h4>Trade agreement threshold</h4>
              <p>The threshold for a specific trade agreement refers to the minimum financial value at which the public procurement processes become subject to international/ interprovincial trade agreements. When the procurement exceeds a certain financial threshold, GoA must follow the rules of the applicable trade agreement, which could include providing more public notice, ensuring non-discriminatory access to the bidding process, and adhering to specific transparency and fairness rules. You can find more information on the trade agreement thresholds by agreement and category, from January 1, 2024 to December 31, 2025 <a href="https://www.alberta.ca/contract-opportunities-with-the-government-of-alberta" target="_blank">on Alberta.ca</a>.</p>
            </section>
            <section className="goa-adm-different-ways">
              <h2 id="different-ways">Understanding how the Government of Alberta (GoA) procures</h2>
              <p>Understanding the various procurement methods used by the GoA is essential for suppliers seeking to engage effectively in public sector opportunities. The GoA uses a variety of approaches depending on the project, ranging from open competitions where many suppliers can participate to specialized requests for more unique or complex needs. Each approach follows clear guidelines to keep the process transparent, fair, and aligned with Alberta's digital and operational goals.</p>

              <div className="goa-adm-accordion">
                <DifferentWaysAccordion />
              </div>
            </section>

            <section className="goa-adm-journey-guide">
              <h2 id="supplier-guide">Supplier journey guide</h2>
              <p>If you are interested in doing business with the government but are not sure where to begin, this guide is for you.</p>
              <p>This guide will walk you through the process of participating in GoA procurement opportunities, from setting up your APC account to getting paid.</p>

              <h3 id="about-apc">About the Alberta Purchasing Connection (APC)</h3>
              <p>The GoA uses an electronic tendering system called <a href="https://purchasing.alberta.ca/" target="_blank">Alberta Purchasing Connection (APC)</a>. The tendering system enables you to view, download, and apply for opportunities that have been posted by the GoA and and other public sector organizations, such as municipalities, academic institutions, school boards, and the health sector. Users may browse the site, but will need to register on APC to download public purchasing opportunities and respond to offer their goods and services to the GoA.</p>

              <h3 id="who-can-register">Who can register on APC?</h3>
              <div className="goa-adm-cards">
                <div className="goa-adm-single-card">
                  <div className="goa-adm-single-card-thumb">
                    <img src={buyers_thumb} alt="Buyers illustration" />
                  </div>
                  <h4>Buyers</h4>
                  <div className="goa-adm-single-card-content">
                    <p>
                      Public service employees who manage procurement for the Government of Alberta, the MASH/ABC sectors, provincial corporations, and indigenous communities
                    </p>
                  </div>
                </div>
                <div className="goa-adm-single-card">
                  <div className="goa-adm-single-card-thumb">
                    <img src={suppliers_thumb} alt="Suppliers illustration" />
                  </div>
                  <h4>Suppliers</h4>
                  <div className="goa-adm-single-card-content">
                    <p>
                      Private businesses interested in offering goods and services to Alberta public sector entities and want to explore opportunities relevant to their business offerings.
                    </p>
                  </div>
                </div>
              </div>

              <h3 id="steps-to-apply">Steps to apply for opportunities as a supplier</h3>

              <div className="goa-adm-stepper">
                <StepsTimeline />
              </div>

              <h3 id="after-signing-contract">After signing the contract</h3>
              <div className="goa-adm-accordion">
                <AfterSigningAccordion />
              </div>
            </section>
            <section className="goa-adm-further-reading">
              <h2 id="further-reading">Further reading</h2>
              <p>Explore other resources around procurement in GoA:</p>
              <ul>
                <li><a href="https://www.alberta.ca/contract-opportunities-with-the-government-of-alberta" target="_blank">Learn about contract opportunities with GoA</a></li>
                <li><a href="https://purchasing.alberta.ca/support" target="_blank">Explore how-to guides and FAQs on APC</a></li>
                <li><a href="https://www.alberta.ca/small-business-resources" target="_blank">Resources for small businesses</a></li>
              </ul>
            </section>
          </div>
          
          <div className="goa-adm-procurement-toc">
            <GoASkeleton type="text" size={2} lineCount={3}></GoASkeleton>
            <TableOfContents />
          </div>
        </div>
      </div>
      <BackToTop />
    </>
  );
};
export default UnderstandingProcurementPage;

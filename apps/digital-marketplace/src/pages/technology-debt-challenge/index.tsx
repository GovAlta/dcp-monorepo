/* eslint-disable prettier/prettier */
import React from 'react';
import Header from './header';
import DebtAccordion from './DebtAccordion';
import Callout from '../../components/callout';
import BackToTop from '../../components/back-to-top';

export default function TechDebtPage() {
  return (
    <>
      <Header />

      <div className="goa-adm-body" id="main">
        <div className="container">
            <section className="goa-adm-process">
                <h2>Overview</h2>
                <p>The Government of Alberta (GoA) is facing substantial technology debt challenges that compromise the sustainability, security, and efficiency of its technological infrastructure. Merging multiple ministries and data centres has created a fragmented environment of outdated legacy systems and modern architecture.</p>
                <p>Proposed solutions must be scalable, sustainable, and cost-effective. They should include on-premise and/or cloud-based solutions that are compatible with the GoA's diverse technological environment, which includes:</p>
                <ul>
                    <li>Java</li>
                    <li>.NET</li>
                    <li>JavaScript</li>
                    <li>Python</li>
                    <li>Windows</li>
                    <li>Linux</li>
                    <li>SQL Server</li>
                    <li>Oracle</li>
                </ul>

                <h3>Key areas of vulnerabilities</h3>
                <ul>
                    <li>Outdated applications and platforms with high maintenance costs or no longer supported or feasible to upgrade</li>
                    <li>Inadequate lifecycle management practices</li>
                    <li>Integration issues</li>
                    <li>Technical limitations resulting in the inability to meet evolving business needs</li>
                </ul>

                <h3>Background on the challenge</h3>
                <p>The Government of Alberta (GoA) is actively addressing technology debt challenges within its Information Management Technology environment to ensure the long-term sustainability and effectiveness of its technological infrastructure.</p>
                <p>The Ministry of Technology and Innovation (TI) must strategically align technology investments with future needs to mitigate Technology Debt and enhance the GoA's strategic and operational capabilities.</p>
                <p>The GoA's technical environment is complex, resulting from the merging of multiple ministries and data centres. While efforts are underway to standardize hardware and software, the environment remains a blend of legacy and modern systems.</p>
                <p>Technology Debt exists predominantly within on-premises environments, though cloud solutions are not exempt from these challenges.</p>

            </section>

            <section className="goa-adm-outcomes">

                <h2>Outcomes</h2>

                <h3>Primary outcome</h3>
                <p>Identify viable technological solutions that effectively address the GoA's technology debt by:</p>
                <ul>
                    <li>Remediating legacy applications to align with modern architectural standards.</li>
                    <li>Improving lifecycle management practices to reduce high maintenance costs.</li>
                    <li>Ensuring that proposed solutions are compatible with both on-premise and cloud-based environments.</li>
                    <li>Technical limitations resulting in the inability to meet evolving business needs.</li>
                </ul>

                <h3>Additional outcome</h3>
                <p>Build a robust, adaptable, and efficient technological environment for the Government of Alberta by:</p>
                <ul>
                    <li>Facilitating the transition from outdated applications to sustainable, future-ready solutions.</li>
                    <li>Reducing costs associated with technology maintenance and upgrades.</li>
                    <li>Promoting innovative ideas to improve GoA procurement processes for Technology Debt remediation.</li>
                    <li>Ensuring seamless integration of legacy and modern systems to support the effective delivery of government services.</li>
                </ul>
                <p>Cost-effective solutions compatible with diverse technological environment that address these challenges and build a resilient, future-ready technological landscape.</p>

                <h4>What the innovators bring</h4>
                <p>Innovators are invited to present their creative solutions to tackle Technology Debt challenges within the GoA. By participating in the Technology Debt Forum, Suppliers can:</p>
                <ul>
                    <li>Share expertise and innovative approaches to technology debt remediation.</li>
                    <li>Propose scalable solutions that address both on-premise and cloud-based challenges.</li>
                    <li>Provide valuable feedback on GoA procurement processes, helping shape future procurement activities.</li>
                    <li>Collaborate with the GoA to enhance technology sustainability and resilience across various systems.</li>
                </ul>
                <h4>What Technology and Innovation provides</h4>
                <p>This initiative is part of a multi-phased model that supports early engagement, risk reduction and solution development in partnership with technology innovators.</p>
                <p>Suppliers must demonstrate their capacity to support proposed solutions for the duration of the GoA's mitigation effort (3-5-year horizon) and show cost-effectiveness compared to traditional remediation methods.</p>

                <div className="goa-adm-accordion">
                    <DebtAccordion />
                </div>
            </section>

            <Callout
                title="Learn more on APC"
                content={
                    <>
                    For more information, visit the APC site for the challenge:<br/>
                    <strong>AB-2025-01740 - Posting - Purchasing Connection</strong>
                    </>
                }
                link="https://purchasing.alberta.ca/posting/AB-2025-01740"
                linkText="View posting"
            />
        </div>
      </div>
      
      <BackToTop />
    </>
  );
};

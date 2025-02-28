import { GoAAccordion, GoAButton, GoASpacer } from '@abgov/react-components';
import React, { useEffect } from 'react';
import BackToTop from '../../components/BackToTop';
import ExternalLink from '../../components/ExternalLink';

export default function ServicePerformance() {
    useEffect(() => {
        if (window.location.hash) {
            const elmnt = document.getElementById(
                window.location.hash.substring(1),
            );
            elmnt?.scrollIntoView(true);
        }
    }, []);
    return (
        <div data-pagefind-body>
            <GoAButton
                type="tertiary"
                size="compact"
                leadingIcon="arrow-back"
                onClick={() => (window.location.href = '/')}
            >
                Back
            </GoAButton>
            <GoASpacer vSpacing="l" />
            <h1 id="practice-areas">Practice Areas</h1>
            <p>
                Practice areas provide team members with processes, guidence,
                and support.
            </p>
            <GoASpacer vSpacing="l" />

            <GoAAccordion headingSize="medium" heading="UX Design" open={false}>
                <h4>Director / Manager:</h4>
                <p>Sheldon Bauld, Director Front End/UX Design</p>
                <h4>Contact hours:</h4>
                <p>8:30am to 4:30pm (MST)</p>
                <h4> Team SharePoint:</h4>
                <p>
                    <ExternalLink
                        link={
                            'https://abgov.sharepoint.com/sites/S600D27-DDDUXT/SitePages/Home.aspx?csf=1&web=1&e=wvZDcQ&CID=167a4aa1-14bd-4995-9a9b-b8500166a088'
                        }
                        text={'DDD UX Team SharePoint'}
                    />
                </p>
                <h4>Practice Area responsibilities:</h4>
                <p>UX Design, Research and Design Systems</p>
                <h4>Guidence audience</h4>
                <p>Front End Designers</p>
                <h4>How does the team support others in the GoA?</h4>
                <p>
                    The User Experience team in the Product Branch is dedicated
                    to establishing best practices to shape and guide our work
                    and meet these new demands.
                </p>
                <p>
                    This space includes guidelines and resources to help you
                    follow the processes and approach that align our work and
                    outcomes with the users' expectations and ministry
                    objectives.
                </p>
                <p>
                    Modern digital products and services have become a ministry
                    priority. The User Experience team in the Product Branch is
                    dedicated to establishing best practices to shape and guide
                    our work and meet these new demands.
                </p>
                <p>
                    Includes guidelines and resources to help you follow the
                    processes and approach that align our work and outcomes with
                    the users' expectations and ministry objectives.
                </p>
            </GoAAccordion>
            <GoASpacer vSpacing="l" />
            <GoAAccordion heading="Service Design" headingSize="medium">
                <h4>Director / Manager:</h4>
                <p>Fouad Jallouli, Director Service Design</p>
                <h4>Contact hours:</h4>
                <p>8:30am to 4:30pm (MST)</p>
                <h4> What is the Practice Area responsible for? </h4>
                <p>Service Design </p>
                <h4>Guidence audience</h4>
                <p>Service Designers, Front End Designers, and UX Designers</p>
                <h4>How does the team support others in the GoA?</h4>
                <p>
                    Service Designers perform research, design user-focused
                    services and help lead the team in the development and
                    continual improvement of government products and services.
                    Service Designers lead and support the product team while
                    working closely with the Product Owner and User Experience
                    Designer.
                </p>
            </GoAAccordion>
            <GoASpacer vSpacing="l" />
            <GoAAccordion heading="Software Delivery" headingSize="medium">
                <h4>Director / Manager:</h4>
                <p>Ting Zuge, Software Delivery Executive Director</p>
                <h4>Contact hours:</h4>
                <p>8:30am to 4:30pm (MST)</p>
                <h4> What is the Practice Area responsible for? </h4>
                <p>
                    Collaborating with other teams: Digital Architects work
                    closely with other practice areas such as UX Design, Service
                    Design, DevOps, QA, and Cloud Operations to ensure that the
                    software solutions meet the needs of users and are delivered
                    efficiently{' '}
                </p>
                <h4>Guidence audience</h4>
                <p>
                    Digital Architects, UX Design, Service Designer, DevOps, QA,
                    and Cloud Operations{' '}
                </p>
            </GoAAccordion>
            <GoASpacer vSpacing="l" />

            {/*<GoAAccordion heading="Service performance platform" headingSize="medium">
          <p>
            Service Performance Platform is set up to measure and monitor Key
            Performance Indicators and Metrics to continuously improve the digital
            services offering. Use cases include:
          </p>
  
          <p>
            <b>Policy Impact Assessment:</b> Capture and demonstrate the benefits
            and effectiveness of policies in real terms for people, technology,
            and outcomes.
          </p>
          <p>
            <b>Standardization of Reporting:</b> Implement standardized methods
            for reporting qualitative metrics and tracking improvements.
          </p>
          <p>
            <b>Storytelling Assistance:</b> Enhance internal and external
            communication, addressing key ministerial concerns through compelling
            storytelling.
          </p>
          <p>
            <b>Value Demonstration:</b> Supports teams and Technology & Innovation
            leadership in showcasing the effectiveness of our methods.
          </p>
          <p>
            <b>Metric Process Enhancement:</b> Aid teams in refining their metric
            collection processes and adopting best practices (includes a library
            of metrics and standards).
          </p>
          <p>
            <b>Cross-Ministry Collaboration:</b> Facilitate the socialization and
            sharing of metric collection practices across ministries.
          </p>
          <p>
            <b>Support for Business Case Development:</b> Assist Engagement Leads
            with intake requests and business case development, particularly with
            the Treasury Board and Finance, by providing necessary documentation,
            guidance, templates, and training resources.
          </p>
        </GoAAccordion>
        <GoASpacer vSpacing="l" />
  
        <GoAAccordion
          heading="Some of the major problems in measuring Digital Services"
          headingSize="medium"
        >
          <p>
            Service Performance Platform is designed to provide solutions to some
            major problems and issues encountered when measuring Digital Services.
            These issues include but not limited to:
          </p>
          <ul className="goa-unordered-list">
            <li>
              No standardized method of measuring Digital Services for
              effectiveness and efficiency.
            </li>
            <li>No single source of truth for Digital Services data.</li>
            <li>
              No standard method of measuring good or bad services and tracking
              services needing improvement.
            </li>
            <li>
              Unable to measure digital services over their entire service
              lifecycle, from initiation to decommissioning.
            </li>
            <li>
              Unable to measure user satisfaction and benefits to ensure we are
              designing for end users.
            </li>
          </ul>
        </GoAAccordion>
        <GoASpacer vSpacing="l" />
  
        <GoAAccordion heading="Why Measure Digital Services" headingSize="medium">
          <p>When our services are measured, programs are able to show:</p>
          <p>
            <b>Accountability and Leadership</b>: Ensures accountability to
            citizens and upholds leadership standards
          </p>
          <p>
            <b>Assessment of Service Quality</b>: Provides metrics to evaluate
            whether our services are effective, efficient, and achieving intended
            outcomes.
          </p>
          <p>
            <b>Policy Impact Evaluation</b>: Demonstrates how well services are
            achieving policy objectives, benefiting the public through improved
            technology and outcomes.
          </p>
          <p>
            <b>Governance and Standards</b>: Establishes our commitment to high
            standards and positions us as thought leaders in digital governance.
          </p>
          <p>
            <b>Operational Improvement</b>: Enhances operations across teams and
            ministries by providing data essential for continuous improvement.
          </p>
          <p>
            <b>Building Trust</b>: Increases transparency and trust among
            Albertans, showing our commitment to service excellence.
          </p>
          <p>
            <b>Funding and Resource Optimization</b>: Ensures optimal use of
            resources and funding, driving more efficient service delivery.
          </p>
          <p>
            <b>Enhancing Communication</b>: Enhances storytelling, making the case
            for digital initiatives and Agile methodologies.
          </p>
        </GoAAccordion> */}
            <GoASpacer vSpacing="2xl" />
            <BackToTop />
        </div>
    );
}

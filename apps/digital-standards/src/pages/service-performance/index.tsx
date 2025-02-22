import { GoAAccordion, GoAButton, GoASpacer } from '@abgov/react-components';
import React, { useEffect } from 'react';
import BackToTop from '../../components/BackToTop';

export default function ServicePerformance() {
  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
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
      <h1 id="service-performance">Service Performance</h1>
      <p>
        Digital Service Standards and Service Performance are a foundational
        commitment of the Digital Strategy.
      </p>
      <p>
        The Government of Alberta is committed to develop Digital Service
        Standards and Service Performance that are measurable and include clear
        accountabilities.
      </p>
      <p>
        By aligning to digital service standards, the Government of Alberta sets
        clear expectations on how we will deliver better, faster, smarter
        services.
      </p>
      <p>
        Measuring performance particularly focuses on standard number three
        which outlines focusing on results - Digital service teams should
        continuously monitor how effectively their services meet Albertans’
        expectations by collecting and analyzing data about their service.
        Assessment of services should include:
      </p>
      <ul className="goa-unordered-list">
        <li>Capturing baseline metrics.</li>
        <li>Scoping, prioritizing, and planning service enhancements.</li>
      </ul>
      <p>
        This ensures adherence to Digital Service Standards: Standard no. 3 —
        Focus on outcomes
      </p>
      <GoASpacer vSpacing="l" />

      <GoAAccordion
        headingSize="medium"
        heading="Standard no. 3 - Focus on outcomes"
        open={false}
      >
        <h4 id="relavent-principles">
          Relavent principles: The standard’s aspirations
        </h4>
        <p>
          <b>No. 4</b> – Operate a reliable service. Ensure services operate,
          improve, and adapt to changing user needs with minimum disruption.
        </p>
        <p>
          <b>No. 9</b> – Design and test the service from end-to-end. Design a
          seamless, resilient experience that meets user needs. Test end-to-end,
          early and often, with users to validate this.
        </p>
        <p>
          <b>No. 13</b> – Measure performance. Measure how well all parts of the
          service work for users and share performance data.
        </p>

        <h4 id="overview">Overview: What the standard represents</h4>
        <p>
          Digital service teams should continuously monitor how effectively
          their services meet Albertans’ expectations by collecting and
          analyzing data about their service. Through appropriately analyzing
          and using performance data and testing the service from end-to-end,
          Albertans will be provided with intuitive and reliable services that
          meet user expectations.
        </p>

        <h4 id="goals">Goals: Why the standard matters</h4>
        <p>Focusing on service performance should:</p>
        <ul className="goa-unordered-list">
          <li>
            <b>...increase end-user confidence</b> by providing consistent
            service performance and minimal disruptions, regardless of end-user
            context, technologies, or conditions.
          </li>
          <li>
            <b>...increase service resiliency and value</b> through identifying
            and addressing required changes to user needs, technology changes,
            and organizational priorities.
          </li>
          <li>
            <b>
              ...drive self-serve interactions and reduce stress on
              resource-heavy channels
            </b>{' '}
            (e.g., mailing, telephone, in-person desks) by increasing the
            reliability and consistency of online options for accessing
            services.
          </li>
        </ul>

        <h4 id="action">In action: How to follow the standard in practice</h4>
        <p>Digital service teams should:</p>
        <ul className="goa-unordered-list">
          <li>
            Track their service’s performance using metrics from available
            sources and channels to ensure an inclusive definition of success.
          </li>
          <li>
            Use research insights to define KPIs that track observable outputs
            and outcomes rather than proxy performance measures (e.g.,
            successful benefits delivery versus landing page hits).
          </li>
          <li>
            Incorporate various conditions – e.g., different devices, channels,
            assistive technologies, and connectivity – within the service’s
            testing activities to ensure its usability across contexts.
          </li>
          <li>
            Assess service performance against similar types of service
            categories within the Government of Alberta and across jurisdictions
            to find ways to benchmark with similar services.
          </li>
          <li>
            Continuously scan the service’s environment to identify and create a
            plan to address potential disruptors – usage spikes, system
            failures, new technologies, etc.
          </li>
          <li>
            Monitor the service use (and related supports) to optimize task
            completion rates across end-users.
          </li>
          <li>
            When a disruption is necessary, inform users in advance with
            appropriate notification methods.
          </li>
        </ul>

        <h4 id="assessment">
          Assessment criteria: Examples of how to measure alignment to the
          Service Standards
        </h4>
        <ul className="goa-unordered-list">
          <li>
            Initial/baseline performance measures have been captured for this
            service and documented appropriately before the start of service
            design improvements.
          </li>
          <li>
            Performance measures are monitored and evaluated throughout the
            development of a service and there is a plan in place to capture
            them once a service is live.
          </li>
          <li>
            Actions and decisions based on the results of performance measures,
            analytics and feedback are captured and documented for further
            investigation and implementation where appropriate.
          </li>
          <li>
            Service enhancements are prioritized, scoped, planned for delivery,
            and aligned to the team’s expectations and product owners and
            executive sponsors are engaged in this process as appropriate.
          </li>
          <li>
            The solution is tested from end-to-end with users and other
            automated tools for testing are leveraged throughout development and
            into operations.
          </li>
          <li>
            Financial controls have been implemented and monitored throughout
            the service delivery cycle and after a service is live.
          </li>
        </ul>
      </GoAAccordion>
      <GoASpacer vSpacing="l" />

      <GoAAccordion heading="The vision" headingSize="medium">
        <p>
          Service Performance aim to bring excellent experiences and value to
          all Albertans ensuring services are always measurable, defining
          service health and performance through a set of indicators that are
          grounded in end-user satisfaction and adoption; productivity; and
          effectiveness by providing the following:
        </p>
        <ul className="goa-unordered-list">
          <li>A transparent view into the performance of digital services.</li>
          <li>
            A common framework and context for service performance measurement.
          </li>
          <li>
            Achieve better outcomes for Albertans and focus on the services with
            the most impact.
          </li>
          <li>
            Show true value to our stakeholders – both internally and
            externally.
          </li>
          <li>
            Collection of baseline performance measurements to better understand
            service’s problem statement.
          </li>
        </ul>
      </GoAAccordion>
      <GoASpacer vSpacing="l" />

      <GoAAccordion
        heading="Performance measurement themes"
        headingSize="medium"
      >
        <p>
          The Service Performance Platform system will capture metrics in a
          central and transparent way, and show the effectiveness of what we are
          working on focusing on results to validate and test the performance
          metrics in the TI strategic plan and support teams operationalize. Key
          Performance Indicators (KPIs) are developed to measure the success
          across four themes:
        </p>
        <ul className="goa-unordered-list">
          <li>
            User Satisfaction: percentage of Albertans satisfied with their
            experience with digital services.
          </li>
          <li>Productivity: how staff are managing their caseloads or work.</li>
          <li>
            Adoption: percentage of transactions that are conducted via digital
            services vs. non digital channels.
          </li>
          <li>
            Processing time: the percentage reduction in time from initial
            request to fulfillment of the service.
          </li>
        </ul>
      </GoAAccordion>
      <GoASpacer vSpacing="l" />

      <GoAAccordion heading="Service performance platform" headingSize="medium">
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
      </GoAAccordion>
      <GoASpacer vSpacing="2xl" />
      <BackToTop />
    </div>
  );
}

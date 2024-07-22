import {
  GoAIcon,
  GoASideMenu,
  GoASpacer,
  GoAThreeColumnLayout,
} from '@abgov/react-components-4.20.2';
import React, { useEffect, useState } from 'react';
import { sideNavItems } from './config';
import './styles.css';
import BackToTop from '../../components/BackToTop';

export default function GettingStartedPage(): JSX.Element {
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      setActiveSection(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);
  const renderGettingStarted = () => {
    return (
      <>
        <h1 id="getting-started">Getting started</h1>
        <h2>What are services?</h2>
        <p>
          Services on common capabilities are the digital tools and technologies
          built by enterprise, platform, product, and portfolio teams in the
          Government of Alberta. These services are standalone but work
          alongside other services and are reusable depending on the business
          context.
        </p>

        <h2>Navigating through service categories</h2>
        <p>
          The services are organised into service categories enabling the
          developers and solution architects to discover and explore services
          based on development focus or context.
        </p>
        <p>
          Follow the steps below to get the most value out of common
          capabilities:
          <ol className="goa-ordered-list">
            <li>Explore the services on the ‘Services’ page.</li>
            <li>
              Identify the ones that align with your development focus or
              business context and evaluate them further by going through the
              service specifications, documentation, and support resources on
              the service details page.
            </li>
            <li>
              Reach out to the provider teams using the contact details to
              discuss possibilities of utilization of the service for your use
              case or sharing knowledge and best practices.
            </li>
          </ol>
        </p>

        <h2>Evaluating a service</h2>
        <p>
          The catalog provides information around technical specifications,
          features, prerequisites, security measures, and documentation to help
          in evaluating whether the service is appropriate for your business use
          case.
        </p>
        <p>
          Some of the essential considerations while evaluating a service for
          your requirements are as follows:
        </p>

        <GoASpacer vSpacing="l" />

        <h3>Recommended vs Other services</h3>
        <p>
          One of the purposes for common capabilities is to nudge teams to use
          ‘recommended’ services. The idea is to standardize the usage of common
          components serving similar purposes. Recommended services are standard
          components that can be used by any product team within the Government
          of Alberta and are mostly provided by the following enterprise and DDD
          platform teams:
          <ul className="goa-unordered-list">
            <li>Alberta.ca</li>
            <li>Service Integrations</li>
            <li>1GX</li>
            <li>CloudOps</li>
            <li>Enterprise Solutions</li>
            <li>Alberta Digital Service Platform (ADSP)</li>
          </ul>
          <a href="/ecosystem/index.html">
            Learn more about the teams and the GoA eco-system
          </a>
        </p>
        <p>
          ‘Other’ services are built by portfolio teams to serve specific use
          cases in some ministries that have distinct requirements. Such
          services are not standard and might not be suitable to be used by the
          product teams. We still encourage you to the reach out to the
          providers of these services to collaborate or share knowledge and best
          practices if you are building a similar service.
        </p>
        <h3>Status: Live, Beta, and Alpha</h3>
        <p>
          The status of the service is another important criteria while choosing
          a service. The status defines the phase of development the service is
          currently in and is reflected by the ‘Live, ‘Beta’, or ‘Alpha’ tags. A
          ‘Live’ service is more reliable than a service that is still in
          ‘Alpha’ or Beta’ phase considering the testing and iterations it has
          gone through. If you find an ‘Alpha’ or ‘Beta’ service that aligns
          with your use case, we encourage you to reach out to the provider team
          and discuss the possibility of collaboration.
        </p>
        <h3>Other common considerations</h3>
        <p>
          There are other factors like the status, language, infrastructure,
          features, usage, implementation, security standards and compliance
          measures, and prerequisites that may affect your decision of utilising
          a service. To make an informed decision, it is essential to evaluate
          the service on the service details page, reviewing the documentation,
          and contacting the provider for further support.
        </p>

        <h2>Accessing and implementing a service</h2>
        <p>
          Accessing a service involves integrating them into your development
          environment. Developers must reach out to the providers of these
          services to discuss possibilities and access detailed documentation
          and support resources. The point of contacts for each service are
          available on the individual service pages for you to get guidance on
          usage and implementation of the service.
        </p>

        <p>
          Some of the possible concerns that you may need to check on the
          service details page or discuss with the provider team could be:
        </p>

        <GoASpacer vSpacing="3xs" />
        <h3>Integration of the service into existing software or projects</h3>
        <p>
          This often involves adding dependencies or making API calls. Visit the
          service details page or ask the provider team for documentation and
          tutorials to guide you through the integration process.
        </p>

        <GoASpacer vSpacing="3xs" />
        <h3>Technical expertise required</h3>
        <p>
          Depends on the service and its complexity. Some services are
          user-friendly and suitable for beginners, while others may require
          more advanced knowledge. Review the documentation and contact the
          teams for details.
        </p>

        <GoASpacer vSpacing="3xs" />

        <h3>Customization or development of specific services</h3>
        <p>
          Standard services are often designed to be technology-agnostic and can
          be used with various programming languages and technologies. However,
          compatibility may vary, so it's essential to check each the service
          documentation for specific details.
        </p>

        <GoASpacer vSpacing="3xs" />

        <h3>Performance considerations</h3>
        <p>
          Depends on the specific service and how it's used. The provider teams
          can help you with specific documentation for performance tips and
          guidelines to <b>optimize</b> your implementation.
        </p>

        <GoASpacer vSpacing="3xs" />

        <h3>On-premises and cloud-based environment</h3>
        <p>
          Most services are designed to be compatible with various deployment
          environments. Review the documentation or consult the teams for
          details.
        </p>

        <GoASpacer vSpacing="3xs" />

        <h3>Contributing to common capabilities</h3>
        <p>
          Many teams are open to contributions from other teams. Check the
          service guidelines for contribution or reach out to their point of
          contact from the service details page and participate in their
          development, report issues, or suggest improvements.
        </p>
      </>
    );
  };
  const renderGlossary = () => {
    return (
      <>
        <h1 id="glossary">Glossary</h1>
        <p>
          Use this glossary to understand the key terms and concepts within the
          context of the common capabilities platform.
        </p>
        <GoASpacer vSpacing="l" />
        <h2>Service attributes</h2>
        <p>
          <span className="bold-text">Provider:</span> The owner of the service,
          which is typically who built it. You can refer to the provider for
          each service on the service details page. Providers can include
          enterprise, platform, product, and portfolio teams.
        </p>
        <p>
          <span className="bold-text">Recommended:</span> Standard components
          built for the product teams within the Government of Alberta.
          Recommended services are mostly provided by enterprise and DDD
          platform teams
        </p>
        <p>
          <span className="bold-text">Other services:</span> Services built to
          serve specific use cases, are not standard components, and might not
          be suitable to be used by the product teams. We still encourage you to
          reach out to the providers of these services to collaborate or share
          knowledge and best practices if you are building a similar service.
        </p>
        <p>
          <span className="bold-text">Status:</span> Reflects the phases of
          development of the service in an agile environment. Each service has
          been tagged with one of the three statuses: Alpha, Beta, or Live.
        </p>
        <p>
          <span className="bold-text">Usage:</span> The method of using or
          integrating the service into other services or products.
        </p>

        <h2>Security and compliance</h2>
        <h3>Risk assessment completion status</h3>
        <p>
          <span className="bold-text">
            Content Management Risk Assessment (CMRA):
          </span>{' '}
          Indicates if or not the CMRA has been completed for the service.
        </p>
        <p>
          <span className="bold-text">
            General Cybersecurity Risk Assessment:
          </span>{' '}
          Indicates if or not the General Cybersecurity Risk Assessment has been
          completed for the service.
        </p>
        <GoASpacer vSpacing="3xs" />

        <h3>Required before using the service</h3>
        <p>
          <span className="bold-text">
            Information Management (IM) consult:
          </span>{' '}
          States if or not IM consult is required before using the service.
        </p>
        <p>
          <span className="bold-text">Data team consult:</span> States if or not
          consultation with the data team is required before using the service.
        </p>
        <p>
          <span className="bold-text">Cybersecurity risk assessment:</span>{' '}
          States if or not cybersecurity risk assessment is required before
          using the service.
        </p>
        <p>
          <span className="bold-text">Cybersecurity consult:</span> States if or
          not cybersecurity consult is required before using the service.
        </p>
        <GoASpacer vSpacing="3xs" />

        <h3>Security details</h3>
        <p>
          <span className="bold-text">
            Information security classification:
          </span>{' '}
          Specifies the level of security needed to safeguard sensitive
          information, such as, Protected A, Protected B, Protected C, or
          Public.
        </p>
        <p>
          <span className="bold-text">Information controller:</span> Name of the
          person or role responsible for controlling the content or information.
        </p>
        <p>
          <span className="bold-text">Special considerations:</span> Lists any
          additional security or compliance information about the service that
          the developers must know before using or implementing.
        </p>
      </>
    );
  };


  return (
    <GoAThreeColumnLayout
      maxContentWidth="1550px"
      rightColumnWidth="8%"
      nav={
        <GoASideMenu>
          {sideNavItems.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setActiveSection(item.id)}
            >
              {item.title}
            </a>
          ))}
        </GoASideMenu>
      }
    >
      <>
        {activeSection === 'getting-started' && renderGettingStarted()}
        {activeSection === 'glossary' && renderGlossary()}
        <BackToTop />
      </>
    </GoAThreeColumnLayout>
  );
}

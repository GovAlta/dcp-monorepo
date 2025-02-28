import React from 'react';
import { GoASpacer } from '@abgov/react-components';

export default function renderGlossary() {
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
        which is typically who built it. You can refer to the provider for each
        service on the service details page. Providers can include enterprise,
        platform, product, and portfolio teams.
      </p>
      <p>
        <span className="bold-text">Recommended:</span> Standard components
        built for the product teams within the Government of Alberta.
        Recommended services are mostly provided by enterprise and DDD platform
        teams
      </p>
      <p>
        <span className="bold-text">Other services:</span> Services built to
        serve specific use cases, are not standard components, and might not be
        suitable to be used by the product teams. We still encourage you to
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
        <span className="bold-text">Information Management (IM) consult:</span>{' '}
        States if or not IM consult is required before using the service.
      </p>
      <p>
        <span className="bold-text">Data team consult:</span> States if or not
        consultation with the data team is required before using the service.
      </p>
      <p>
        <span className="bold-text">Cybersecurity risk assessment:</span> States
        if or not cybersecurity risk assessment is required before using the
        service.
      </p>
      <p>
        <span className="bold-text">Cybersecurity consult:</span> States if or
        not cybersecurity consult is required before using the service.
      </p>
      <GoASpacer vSpacing="3xs" />

      <h3>Security details</h3>
      <p>
        <span className="bold-text">Information security classification:</span>{' '}
        Specifies the level of security needed to safeguard sensitive
        information, such as, Protected A, Protected B, Protected C, or Public.
      </p>
      <p>
        <span className="bold-text">Information controller:</span> Name of the
        person or role responsible for controlling the content or information.
      </p>
      <p>
        <span className="bold-text">Special considerations:</span> Lists any
        additional security or compliance information about the service that the
        developers must know before using or implementing.
      </p>
    </>
  );
}

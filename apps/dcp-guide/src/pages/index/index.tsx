import React, { useEffect } from 'react';
import { GoAIcon, GoAContainer } from '@abgov/react-components';
import Astro from '../../assets/astro.png';
import Github from '../../assets/github.png';
import Script from '../../assets/Script.png';
import '../../styles/global.css';

export default function HomePage() {
  return (
    <>
      <main>
        <h3>What is DCP?</h3>
        <div>
          <p>
            DCP is a platform for digital content products. It includes shared
            libraries and micro-apps for rapid authoring and publishing of
            content with workflows for technical and non-technical writers.
            ADSP's digital content platform is a place for, well, digital
            content! Its where DDD teams can build and deploy websites for use
            within the organization, providing information to people within the
            Government of Alberta about various things like:
          </p>
          <ul>
            <li>Application overviews</li>
            <li>Application user guides and tutorials</li>
            <li>New application functionality</li>
            <li>Application FAQs</li>
            <li>DDD development standards and guidelines</li>
            <li>Team development standards and guidelines</li>
            <li>Technology concepts and implementations</li>
          </ul>
        </div>
        <div className="spacing">
          <p>
            {' '}
            It is meant to be a home for static websites, for information
            sharing rather than information processing. DCP is organized as a
            set of independent microsites, each with a specific purpose. The
            only thing they have in common is that they share
          </p>
        </div>
        <div className="technologies">
          <div className="technology">
            <div className="img-wrap">
              <noscript>
                <img src={Astro} alt="" />
              </noscript>
              <img
                alt=""
                data-image-id="62478e63266c637821c47343"
                data-type="image"
                src={Astro}
              />
            </div>
          </div>
          <div className="technology">
            <div className="img-wrap">
              <noscript>
                <img src={Github} alt="" />
              </noscript>
              <img
                alt=""
                data-image-id="62478e63266c637821c47346"
                data-type="image"
                src={Github}
              />
            </div>
          </div>
          <div className="technology">
            <div className="img-wrap">
              <noscript>
                <img src={Script} alt="" />
              </noscript>
              <img
                alt=""
                data-image-id="62478e63266c637821c47342"
                data-type="image"
                src={Script}
              />
            </div>
          </div>
        </div>

        <div className="services-wrapper">
          <GoAContainer accent="thin">
            <div className="service-heading">File Service</div>
            <div className="service-sub-heading">
              Alberta Digital Service Platform (ADSP)
            </div>
            <p>
              Provides capabilities for uploading and managing files in
              Microsoft's Azure Blob Storage. It includes support for virus
              scanning, access control, retention policy, retrieval, and
              searching. The service is intended to give applications a means to
              manage temporary files (e.g. retention policy &lt; 30 days), or
              whose content is not directly needed by the application's business
              users.
            </p>
            <div className="service-contact">
              Contact: <a href="mailto:adsp@gov.ab.ca">ADSP platform</a>
              <GoAIcon size="small" type="open" />
            </div>
          </GoAContainer>
          <GoAContainer accent="thin">
            <div className="service-heading">PDF Service</div>
            <div className="service-sub-heading">
              Alberta Digital Service Platform (ADSP)
            </div>
            <p>
              Provides the capability for creating customized PDF documents for
              downloading by end users. By utilizing our editor to create
              templates and combining them with intake data, developers can
              easily create GOA branded PDFs. The documents are uploaded to
              Azure Blob storage and can be managed there securely, throughout
              their lifecycle, with the ADSP file service.
            </p>
            <div className="service-contact">
              Contact: <a href="mailto:adsp@gov.ab.ca">ADSP platform</a>
              <GoAIcon size="small" type="open" />
            </div>
          </GoAContainer>
          <GoAContainer accent="thin">
            <div className="service-heading">Event Service</div>
            <div className="service-sub-heading">
              Alberta Digital Service Platform (ADSP)
            </div>
            <p>
              The event service provides the capability for applications to
              define, and log, domain events. This gives them an easy way to
              implement traceability, auditability, accountability and
              transparency. In addition the service is often coupled, and used
              in conjunction with, other ADSP services. E.G an application is
              using the Notification Service it would use specific domain events
              to trigger notifications.
            </p>
            <div className="service-contact">
              Contact: <a href="mailto:adsp@gov.ab.ca">ADSP platform</a>
              <GoAIcon size="small" type="open" />
            </div>
          </GoAContainer>
        </div>
      </main>
    </>
  );
}

import {
  GoAContainer,
  GoAGrid,
  GoASpacer,
} from '@abgov/react-components-4.20.2';
import React from 'react';
import './styles.css';

export default function LandingPage() {
  return (
    <div data-pagefind-body>
      <h2>Digital service standards program</h2>
      <p>
        Through the standards, with new supports and guidance, we’re shifting
        how teams develop and produce user-centred products and services for
        citizens and businesses in a safe and secure manner.​ Positioning
        Alberta as a technology and innovation hub and creating opportunities
        for all Albertans to contribute, thrive, and succeed in our digital
        economy. 
      </p>

      <p>
        The Digital Service Standards Program has several components to support
        product teams through all phases of the product lifecycle.
      </p>
      <GoASpacer vSpacing="xl" />

      <GoAGrid gap="xl" minChildWidth="320px">
        <GoAContainer type="interactive" accent="thin">
          <a id="service-tile-title" href={`service-standards/index.html`}>
            Digital Service Standards
          </a>
          <GoASpacer vSpacing="m" />
          <p>
            The Digital Service Standards are IMT policy, derived from the
            Digital Service Principles, used for designing and delivering
            digital government services.
          </p>
        </GoAContainer>
        <GoAContainer type="interactive" accent="thin">
          <a id="service-tile-title" href={`service-principles/index.html`}>
            Digital Service Principles
          </a>
          <GoASpacer vSpacing="m" />
          <p>
            The 14 Digital Service Principles support the vision to deliver
            world-class digital services that are easy to use, fast, efficient,
            and secure.
          </p>
        </GoAContainer>
        <GoAContainer type="interactive" accent="thin">
          <a id="service-tile-title" href={`service-help/index.html`}>
            Digital Service Standards Team
          </a>
          <GoASpacer vSpacing="m" />
          <p>
            The Digital Service Standards Team will be available to provide
            guidance and make sure digital teams are on the right track to
            compliance.
          </p>
        </GoAContainer>
        <GoAContainer type="interactive" accent="thin">
          <a id="service-tile-title" href={`service-performance/index.html`}>
            Service Performance Program
          </a>
          <GoASpacer vSpacing="m" />
          <p>
            Service Performance aims to bring excellent experiences and value to
            all Albertans ensuring services are always measurable, defining
            service health and performance.
          </p>
        </GoAContainer>
        <GoAContainer type="interactive" accent="thin">
          <a id="service-tile-title" href={`service-assessments/index.html`}>
            Digital Service Standards Assessment
          </a>
          <GoASpacer vSpacing="m" />
          <p>
            Based on the Digital Service Standards, clear criteria have been
            established for the evaluation of services. Learn when and how to get an assessment.
          </p>
        </GoAContainer>
      </GoAGrid>
      <GoASpacer vSpacing="2xl" />      
    </div>

  );
}

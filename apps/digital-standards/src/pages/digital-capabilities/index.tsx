import { GoAButton, GoASpacer, GoAAccordion } from '@abgov/react-components';
import React, { useEffect } from 'react';
import BackToTop from '../../components/BackToTop';
import ExternalLink from '../../components/ExternalLink';

export default function ServiceHelp() {
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
      <h1 id="digital-capabilites">Digital Capability Program</h1>
      <GoASpacer vSpacing="l" />
      <h2 id="mandate">Program Mandate</h2>
      <p>
        To build a digitally capable Government of Alberta by growing the knowledge, skills and experience of public servants in digital-era service design and delivery.
      </p>
      <GoASpacer vSpacing="l" />
      <h2>
        Program Outcomes
      </h2>
      <p>
        <ul className="goa-unordered-list">
          <li>
            Shared <b>understanding and application of digital ways for working</b> in Digital Design and Delivery (DDD) across Technology and Innovation (TI) and with Ministry partners
          </li>
          <li>
          Strong <b>relationships between Ministry Partners and TI</b> leading to an increased understanding and support to deliver simpler, faster and better GoA services for Albertans
          </li>
          <li>
            <b>Skills and confidence for public servants</b> to thrive in the digital era by understanding and applying a digital mindset and methods in their day to day 
          </li>
          <li>
            GoA becomes an <b>employer of choice</b> for digital, data, and technology professionals who seek to create positive impacts on the lives of Albertans 
          </li>
        </ul>
      </p>
      <GoASpacer vSpacing="l" />
      <h2>Learning Pathways and User Groups</h2>
    <p>Digital capability focuses on three pathways with a suite of training and learning supports under each:</p>
    <ol className="goa-ordered-list">
      <li>Digital Foundations: Targeted to <b>everyone in the GoA</b>, this pathway aims to provide a common digital foundation to support digital transformation</li>
    <li>Digital Practice: <b>Focused on practitioners, product and delivery teams working on digital transformation</b>, this pathway aims to continuously improve services designed around the needs of users by providing tools, community support and skill development</li>
    <li>Digital-Era Leadership: This pathway is <b>for executives and emerging leaders in the digital transformation space</b>. The aim is to support transformation by building digitally capable leadership familiar with supporting and governing digital transformation</li>
    </ol>
    <h3>Priority</h3>
      <p>
        <ul className="goa-unordered-list">
          <li>
          TI users who might benefit from hands-on experience with the critical elements of modern digital
          design and delivery
          </li>
          <li>
          Internal GoA users in partner Ministries
          </li>
          <li>
          Mixed approach, with curation/adaptation of learning materials from external sources and creation of
          bespoke learning materials to best serve GoA needs
          </li>
        </ul>
      </p>
      <h3 id="future">Future</h3>
      <p>
        <ul className="goa-unordered-list">
          <li>
          Working with PSC to create a more permanent profession of digital, data and technology specialists in
          the APS
          </li>
          <li>
          Building career pathways for specialists and mechanisms for recruitment
          </li>
          <li>
          Developing role-based digital capabilities such as for policymakers
          </li>
        </ul>
      </p>
      <h3 id="out-of-scope">Out of Scope</h3>
      <p>
        <ul className="goa-unordered-list">
          <li>
          Capability development for external users
          </li>
          <li>
          Creation of learning materials that are not related to digital capability 
          </li>
        </ul>
      </p>
      <GoASpacer vSpacing="l" />
      
            <h2 id='core-training'>Core Training: Course Descriptions</h2>
      <GoASpacer vSpacing="l" />
      <GoAAccordion
              headingSize="medium"
              heading="Digital Foundations"
              open={false}
            >
              <p>Lays the groundwork for modern digital design and delivery with the
goal of equipping public servants to understand and apply the culture, values and practice of the
digital-era to public policy and services. More specifically, the intended outcomes for Digital
Foundations are for participants to:</p>
<ul className="goa-unordered-list">
    <li>Understand core digital principles</li>
    <li>Explore concepts such as agile, product management, human-centred design, and digital-era
technology
</li>
<li>Build a foundational understanding of how to design and deliver simpler, better digital-era services</li>
<li>Create safe spaces for dialogue and forming connections</li>
</ul><GoASpacer vSpacing="l" />
      <h3>
        Digital Foundations Course Sessions
      </h3>
      <ul className="goa-unordered-list">
     <li> For information on upcoming course offerings check the <ExternalLink
            link={'https://abgov.sharepoint.com/sites/S300D27-DSH/_layouts/15/Events.aspx?ListGuid=d857e116-d5c9-4d8b-8083-acafd2372cf9&Category=Digital%20Foundations&StartDate=2025-01-01&EndDate=2031-01-04&AudienceTarget=true'}
            text={'Digital Services Hub event listing'}
          /></li></ul>
</GoAAccordion>
      <GoASpacer vSpacing="l" />
      <GoAAccordion
              headingSize="medium"
              heading="Agile Foundations"
              open={false}
            >
              <p> Is a pre-requisite of the Product Owner training and provides an overview
              of the important concepts for working in an Agile project environment. Topics covered include:</p>
<ul className="goa-unordered-list">
    <li>The characteristics of an empowered team</li>
    <li>Digital Design and Delivery (DDD) product team roles to familiarize participants with the structure of
    a DDD team and the rationale for each role
</li>
<li>Agile methodologies, including Minimum Viable Products (MVPs) and the importance of MVPs within
the DDD context</li>
<li>The Discovery, Alpha, Beta and Life product lifecycle</li>
<li>Epics and User Stories and how to work with these concepts</li>
<li>Scrum ceremonies, as applied to the DDD project lifecycle</li>
<li>DDD’s dual track approach to Agile</li>
</ul>
<p>The training is a mix of presentations, videos and interactive activities to support participants’ learning.</p>
<GoASpacer vSpacing="l" />
      <h3>
        Agile Foundations Course Sessions
      </h3>
<p><b>NOTE:</b> Agile Foundations is a pre-requisite for Product Owner Training.
</p>
<ul className="goa-unordered-list">
<li>These sessions are virtual half-days, from 9AM to 12 PM.</li>
<li>For information on how to register for Agile Foundations training contact <ExternalLink
            link={'mailto:goa.digital-capability@gov.ab.ca'}
            text={'goa.digital-capability@gov.ab.ca'}
          /> by email.</li></ul>
          </GoAAccordion>
<GoASpacer vSpacing="l" />
      <GoAAccordion
              headingSize="medium"
              heading="Product Owner Training"
              open={false}
            >
              <p>Is a two-day course offering that goes in depth into what it is
required of product owners. Participants start the session with a recap of the Agile Foundations
training and then move into more detail on the role, responsibilities, and how to apply the tools and
methods for Product Owners.
Day one covers:
              </p>
<ul className="goa-unordered-list">
    <li>Digital Design and Delivery (DDD) – an overview on the methodology and delivery framework
including the product team composition and roles, Service Design roles and accountabilities, and
self-managing teams</li>
    <li>Product owner primary accountabilities
</li>
<li>Agile Methodologies, including the basics on methods and ceremonies, focusing on the scrum
framework</li>
<li>Minimum Viable Products (MVPs)</li>
<li>User story mapping</li>
<li>Product Owner Competencies</li>
</ul>
<p>Day two covers:</p>
<ul className="goa-unordered-list">
    <li>Review of day one and a discussion of communication styles</li>
    <li>A day in the life of a product owner – a discussion and Q&A session with a product owner
</li>
<li>Introduction to user stories, how to construct a user story, advice on acceptance criteria, and splitting
stories (including the INVEST method)</li>
<li>Agile prioritization techniques</li>
<li>Team working agreements</li>
<li>Using Jira and Confluence</li>
<li>Product Management Metrics and KPIs</li>
</ul>
<GoASpacer vSpacing="l" />
      <h3>
        Product Owner Course Sessions
      </h3>
<p><b>NOTE:</b> Agile foundations is a pre-requisite for Product Owner Training.
</p>
<ul className="goa-unordered-list">
<li>Current Product Owners are given priority; however, other staff may be considered depending on
availability.</li>
<li>These sessions are virtual, full-days, from 9AM to 4 PM with a one-hour break 
</li>
<li>For information on how to register for Product Owner training contact <ExternalLink
            link={'mailto:goa.digital-capability@gov.ab.ca'}
            text={'goa.digital-capability@gov.ab.ca'}
          /> by email.</li></ul>
</GoAAccordion>
<GoASpacer vSpacing="l" />
      
            <h2 id='contact'>Contact</h2>
      <p>For more information or questions on the Digital Capability Program email <ExternalLink
            link={'mailto:goa.digital-capability@gov.ab.ca'}
            text={'goa.digital-capability@gov.ab.ca'}
          />.</p>
      <GoASpacer vSpacing="2xl" />      
      <BackToTop />
    </div>
  );
}

import { GoASpacer, GoAButton, GoAIcon } from '@abgov/react-components-4.20.2';
import React from 'react';
import Feedback from '../../components/Feedback';
import BackToTop from '../../components/BackToTop';
import ExternalLink from '../../components/ExternalLink';

export default function ServiceAssessments(): JSX.Element {
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
      <h1>Service Assessments</h1>
      <GoASpacer vSpacing="l" />
      <p>
        If your service is in the discovery phase you should have the following
        in place before booking an assessment:
      </p>
      <ul className="goa-unordered-list">
       <li>Have developed opportunity cards or have begun writing your release
       proposal.</li> 
      <li>Have defined user group(s) and problem statement(s)</li>
      </ul>
       <p> All other services in any phase of the digital service design lifecycle
        may book an assessment at any time.</p>
      <p>Before booking an assessment:</p>
      <ul className="goa-unordered-list">
        <li>Familiarize yourself with the Digital Service Standards.</li>
        <li>Booking an assessment</li>
        <li>
          To book an assessment email the Digital Service Standards Team at 
          <ExternalLink
            link={"mailto:DigitalServiceStandards@gov.ab.ca"}
            text={"DigitalServiceStandards@gov.ab.ca"}
          />
        </li>
      </ul>
      <GoASpacer vSpacing="l" />
      <h2>Who should attend the assessment</h2>
      <p>
        It is recommended that at least the following team members attend the
        assessment:
      </p>
      <ul className="goa-unordered-list">
        <li>Product Owner</li>
        <li>Product Development Lead</li>
        <li>Service Designer</li>
        <li>Scrum Master (alpha, beta, and live assessments)</li>
      </ul>
      <GoASpacer vSpacing="l" />
      <h2>How to prepare for an assessment</h2>
      <p>
        When the assessment is booked you will receive a link to an assessment
        tool. This assessment tool is designed to prepare your team for all
        questions and topics discussed in the assessment meetings. Please complete this tool 24 business hours ahead of the assessment meeting.
      </p>
      <GoASpacer vSpacing="l" />
      <h2>What will happen during the assessment</h2>
      <p>
        The assessment will be conducted by a minimum of two members of the
        Digital Service Standards team and often will also include a Practice
        Area Director. The following items are often covered in all assessments
        regardless of the digital service design lifecycle phase:
      </p>
      <p>An overview of the service including:</p>
      <ul className="goa-unordered-list">
        <li>
          Details about the user group(s) and what problem the service is
          solving.
        </li>
        <li>Details about the wider user journey</li>
        <li>Describing the governance of the service and team roles.</li>
        <li>
          Providing details about Key Performance Indicators and metrics that
          are either planned or already being collected.
        </li>
        <li>
          Discuss common platforms like Alberta.ca Account or common components
          that are being used or considered for the service.
        </li>
      </ul>
      <p>
        The team will be asked to provide any relevant documentation like
        opportunity cards or Executive presentation slide decks.
      </p>
      <GoASpacer vSpacing="l" />
      <h2>What will happen after the assessment</h2>
      <ul className="goa-unordered-list">
        <li>
          Any follow-up questions from the assessment team will be provided by
          email.
        </li>
        <li>
          A report based on the findings of the assessment will be emailed to
          your team.
        </li>
      </ul>
      <p>
        Any questions, comments, and feedback about the report, assessment or
        process can be sent to 
        <ExternalLink
            link={"mailto:DigitalServiceStandards@gov.ab.ca"}
            text={"DigitalServiceStandards@gov.ab.ca"}
          />.
      </p>
      <GoASpacer vSpacing="2xl" />
      <Feedback />
      <BackToTop />
    </div>
  );
}
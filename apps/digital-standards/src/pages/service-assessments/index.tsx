import {
    GoASpacer,
    GoAButton,
  } from '@abgov/react-components-4.20.2';
  import React from 'react';
  import Feedback from '../../components/Feedback';
  import BackToTop from '../../components/BackToTop';
  
  export default function ServiceAssessments(): JSX.Element {
    return (
      <div>
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
    <p>Learn about the service assessment process, who it involves, when a service should be assessed, and how to book.</p>
    <p>If your service is in the discovery phase you should have the following in place before booking an assessment:</p>
<p>Have developed opportunity cards or have begun writing your release proposal.</p>
<p>Have defined user group(s) and problem statement(s)</p>
<p>All other services in any phase of the digital service design lifecycle may book an assessment at any time.</p>
<p>Before booking an assessment:</p>
<ul>
<li>Familiarize yourself with the Digital Service Standards.</li>
<li>Booking an assessment</li>
<li>To book an assessment email the Service Standards Unit at ServiceStandards@abgov.onmicrosoft.com.</li>
</ul>
<h2>Who should attend the assessment</h2>
<p>It is recommended that at least the following team members attend the assessment:</p>
<ul>
<li>Product Owner</li>
<li>Product Development Lead</li>
<li>Service Designer</li>
<li>Scrum Master (alpha, beta, and live assessments)</li>
</ul>
<h2>How to prepare for an assessment</h2>
<p>When the assessment is booked you will receive a link to an assessment tool. This assessment tool is designed to prepare your team for all questions and topics discussed in the assessment meetings. Please review this tool ahead of time.</p>
<p>What will happen during the assessment</p>
<p>The assessments will be conducted by a minimum of two members of the Digital Service Standards team and often will also include a Practice Area Director. The following items are often covered in all assessments regardless of the digital service design lifecycle phase:</p>
<p>An overview of the service including:</p>
<ul>
<li>Details about the user group(s) and what problem the service is solving.</li>
<li>Details about the wider user journey</li>
<li>Describing the governance of the service and team roles.</li>
<li>Providing details about Key Performance Indicators and metrics that are either planned or already being collected.</li>
<li>Discuss common platforms like Alberta.ca Account or common components that are being used or considered for the service.</li>
</ul>
<p>The team will be asked to provide any relevant documentation like opportunity cards or Executive presentation slide decks.</p>
<h2>What will happen after the assessment</h2>
<ul>
<li>Any follow-up questions from the assessment team will be provided by email.</li>
<li>A report based on the findings of the assessment will be emailed to your team.</li>
</ul>
<p>Any questions, comments, and feedback about the report, assessment or process can be sent to ServiceStandards@abgov.onmicrosoft.com</p>
<p>&nbsp;</p>
        
        <GoASpacer vSpacing="2xl" />
  
        <Feedback />
        <BackToTop />
      </div>
    );
  }
  
import { GoAButton, GoASpacer } from '@abgov/react-components';
import React, { useEffect } from 'react';
import BackToTop from '../../components/BackToTop';

export default function ServiceHelp() {
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
            <h1 id="how-dss-will-help">How DSS will help</h1>
            <GoASpacer vSpacing="l" />
            <h2 id="we-are-here-to-help">We are here to help.</h2>
            <p>
                As delivery teams explore and adopt new ways of working, the
                Digital Service Standards Team will be available to provide
                guidance and make sure everyone is on the right track to
                compliance. You may reach us at any time to work through your
                questions around Digital Service Standard resources,
                methodologies and assessment processes.
            </p>
            <GoASpacer vSpacing="l" />
            <h3 id="refer-below-for-how-the-digital-service-standards-team-can-assist-you">
                Refer below for how the Digital Service Standards team can
                assist you.
            </h3>
            <h4 id="assessment-coordination">Assessment coordination</h4>
            <p>
                <ul className="goa-unordered-list">
                    <li>
                        <b>Guide delivery teams</b> through the assessment
                        process and outcomes
                    </li>
                    <li>
                        <b>Ensure alignment with Digital Standards,</b>{' '}
                        including advising service teams/SMEs when conducting
                        self-assessments and evaluations
                    </li>
                    <li>
                        <b>Leverage delivery team feedback</b> to update the
                        Standards documentation, assessment models, and
                        educational materials to make sure they meet the
                        organization’s needs
                    </li>
                </ul>
            </p>
            <h4 id="adoption-monitoring">Adoption monitoring</h4>
            <p>
                <ul className="goa-unordered-list">
                    <li>
                        <b>Oversee the level of adoption</b> of the Standards
                        across the GoA
                    </li>
                    <li>
                        <b>Identify challenges and opportunities</b> that can
                        drive Standards adoption when addressed
                    </li>
                    <li>
                        <b>Disseminate 'lessons learned'</b> to facilitate
                        widespread adoption of the Standards
                    </li>
                </ul>
            </p>
            <h4 id="support-signposting">Support signposting</h4>
            <p>
                <ul className="goa-unordered-list">
                    <li>
                        <b>Connect delivery teams</b> to subject-matter experts
                        across the GoA that can help them upskill in the
                        capabilities required for Standard compliance.
                    </li>
                    <li>
                        <b>Centralize resources </b>(internal and external)
                        providing guidance to Standard-compliant practices.
                    </li>
                </ul>
            </p>
            <GoASpacer vSpacing="2xl" />
            <BackToTop />
        </div>
    );
}

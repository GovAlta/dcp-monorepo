import React, { useEffect, useState } from 'react';
import {
  GoAAccordion,
  GoAIcon,
  GoASpacer,
  GoAThreeColumnLayout,
} from '@abgov/react-components';
import './styles.css';
import faqs from './faq.json';
import ExternalLink from '../../components/ExternalLink';

export default function ContactPage(): JSX.Element {
  return (
    <div
      style={{
        padding: '0px 68px',
      }}
    >
      <GoAThreeColumnLayout>
        <h2>Contact</h2>
        <GoASpacer vSpacing="2xl" />
        <h3>Frequently asked questions</h3>
        {faqs.map((faq) => (
          <>
            <GoAAccordion heading={faq.heading}>{faq.content}</GoAAccordion>
            <GoASpacer vSpacing="m" />
          </>
        ))}
        <h3>Contact us by email</h3>
        <div className='line-elements'>
          <GoAIcon type="mail" theme='outline' />
          <ExternalLink
            link="mailto:TI.Softwaredelivery@ab.gov.ca?subject=Feedback for Common Capabilities"
            text="Common capabilities team"
          />
        </div>
        <h3>Slack support channel </h3>
        <div className='line-elements'>
          <GoAIcon type="logo-slack" theme='outline' />
          <ExternalLink
            link="https://goa-dio.slack.com/channels/commoncapabilities"
            text="Common capabilities team"
          />
        </div>
      </GoAThreeColumnLayout>
    </div>
  );
}

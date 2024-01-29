import React from 'react';
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
        <h3>By email</h3>
        <div className='line-elements'>
          <GoAIcon type="mail" theme='outline' />
          <ExternalLink
            link="mailto:TI.Softwaredelivery@gov.ab.ca?subject=Feedback for Common Capabilities"
            text="Common capabilities team"
          />
        </div>
        <h3>Teams support channel </h3>
        <div className='line-elements'>
          <GoAIcon type="person" theme='outline' />
          <ExternalLink
            link="https://teams.microsoft.com/l/channel/19%3aTzamGNMm-n21VoLqbCiU68hxpp3TuCKVAqHurh78-j01%40thread.tacv2/General?groupId=169394f7-780d-40eb-ab1e-a0b68b828b76&tenantId=2bb51c06-af9b-42c5-8bf5-3c3b7b10850b"
            text="Common capabilities team"
          />
        </div>
        <GoASpacer vSpacing="2xl" />
        <h3>Frequently asked questions</h3>
        {faqs.map((faq) => (
          <>
            <GoAAccordion heading={faq.heading}>{faq.content}</GoAAccordion>
            <GoASpacer vSpacing="m" />
          </>
        ))}
      </GoAThreeColumnLayout>
    </div>
  );
}

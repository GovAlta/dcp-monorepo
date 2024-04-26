import React, { useEffect } from 'react';
import {
  GoAAccordion,
  GoAIcon,
  GoASpacer,
  GoAThreeColumnLayout,
} from '@abgov/react-components-4.20.2';
import './styles.css';
import faqs from './faq.json';
import ExternalLink from '../../components/ExternalLink';

export default function SupportPage(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  });
  const renderContact = (method: any) => {
    const contactMethods: any = {
      Teams: {
        iconType: 'person',
        linkPrefix: '',
      },
      Email: {
        iconType: 'mail',
        linkPrefix: 'mailto:',
      },
    };
    const methodConfig = contactMethods[method.type] || {};
    const iconType = methodConfig.iconType || '';
    const linkPrefix = methodConfig.linkPrefix || '';

    return (
      <tr className="items-color">
        <td className="contact-type">{`${method.type}:  `}</td>
        <td>
          <GoAIcon type={iconType} size="small" theme="outline" />
        </td>
        <td className="td-links">
          <ExternalLink
            link={`${linkPrefix}${method.url}`}
            text={method.value}
          />
        </td>
      </tr>
    );
  };
  const renderContactTable = () => {
    const contactMethods = [
      {
        type: 'Teams',
        url: 'https://teams.microsoft.com/l/channel/19%3aTzamGNMm-n21VoLqbCiU68hxpp3TuCKVAqHurh78-j01%40thread.tacv2/General?groupId=169394f7-780d-40eb-ab1e-a0b68b828b76&tenantId=2bb51c06-af9b-42c5-8bf5-3c3b7b10850b',
        value: 'Common capabilities team',
      },
      {
        type: 'Email',
        url: 'TI.Softwaredelivery@gov.ab.ca?subject=Feedback for Common Capabilities',
        value: 'TI.Softwaredelivery@gov.ab.ca',
      },
    ]
    return (
      <table className="contact-table">
        <tbody>
          {contactMethods.map((method) => renderContact(method))}
        </tbody>
      </table>
    );
  }
  return (
    <div
      style={{
        padding: '0px 68px',
      }}
    >
      <GoAThreeColumnLayout>
        <h2>Contact</h2>
        {renderContactTable()}
        <GoASpacer vSpacing="2xl" />
        <h3 id="faq-section">Frequently asked questions</h3>
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

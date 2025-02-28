import React, { useEffect } from 'react';
import {
  GoAIcon,
  // eslint-disable-next-line import/named
  GoAIconType,
  GoASpacer,
  GoAThreeColumnLayout,
} from '@abgov/react-components';
import './styles.css';
import ExternalLink from '../../components/ExternalLink';
import { ContactMethod } from '../../types/types';

type ContactMethodConfig = {
  iconType: string;
  linkPrefix: string;
};

export default function SupportPage(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);
  const renderContact = (method: ContactMethod) => {
    const contactMethods: { [key: string]: ContactMethodConfig } = {
      teams: {
        iconType: 'person',
        linkPrefix: '',
      },
      email: {
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
          <GoAIcon
            type={iconType as GoAIconType}
            size="small"
            theme="outline"
          />
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
        type: 'teams',
        url: 'https://teams.microsoft.com/l/channel/19%3aTzamGNMm-n21VoLqbCiU68hxpp3TuCKVAqHurh78-j01%40thread.tacv2/General?groupId=169394f7-780d-40eb-ab1e-a0b68b828b76&tenantId=2bb51c06-af9b-42c5-8bf5-3c3b7b10850b',
        value: 'Common capabilities team',
      },
      {
        type: 'email',
        url: 'TI.Softwaredelivery@gov.ab.ca?subject=Feedback for Common Capabilities',
        value: 'TI.Softwaredelivery@gov.ab.ca',
      },
    ];
    return (
      <table className="contact-table">
        <tbody>{contactMethods.map((method) => renderContact(method))}</tbody>
      </table>
    );
  };
  return (
    <div
      style={{
        padding: '0px 68px',
      }}
    >
      <GoAThreeColumnLayout maxContentWidth="1500px">
        <h1>Support</h1>
        <p>
          The common capabilities team is open to feedback, requests, concerns,
          and any inquiries regarding the existing capabilities or about your
          experience using common capabilities platform.{' '}
        </p>
        <GoASpacer vSpacing="xl" />
        <h2>Have questions or concerns?</h2>
        <p>
          Feel free to reach out to us with any other questions or concerns you
          may have. Our team will get back you within 3-4 days with a response
          or to discuss more in detail.
        </p>
        {renderContactTable()}
        <GoASpacer vSpacing="2xl" />
      </GoAThreeColumnLayout>
    </div>
  );
}

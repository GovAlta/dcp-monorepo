import React, { useEffect } from 'react';
import {
  GoAAccordion,
  GoAIcon,
  GoASpacer,
  GoAThreeColumnLayout,
} from '@abgov/react-components';
import './styles.css';
import faqs from './faq.json';
// import ExternalLink from '../../components/ExternalLink';

export default function FaqPage(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  });
  return (
    <div
      style={{
        padding: '0px 68px',
      }}
    >
      <GoAThreeColumnLayout>
        
        <h2 id="faq-section">Frequently asked questions</h2>
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

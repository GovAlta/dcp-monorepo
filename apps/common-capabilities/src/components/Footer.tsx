import React from 'react';
import {
  GoAAppFooter,
  GoAAppFooterMetaSection,
  GoAAppFooterNavSection,
} from '@abgov/react-components';

const Footer = () => {
  return (
    <>
      <GoAAppFooter maxContentWidth="1500px">
        <GoAAppFooterNavSection maxColumnCount={1}>
          <a href="/gettingstarted/index.html#getting-started">Getting started</a>
          <a href="/about/index.html">About</a>
          <a href="/ecosystem/index.html">Eco-system</a>
        </GoAAppFooterNavSection>

        <GoAAppFooterNavSection>
          <a href="/services/index.html">Services</a>
          <a href="/support/index.html">Support</a>
        </GoAAppFooterNavSection>

        <GoAAppFooterMetaSection>
          {/* <a href="disclaimer.html"> Disclaimer </a>           */}
        </GoAAppFooterMetaSection>
      </GoAAppFooter>
    </>
  );
};

export default Footer;

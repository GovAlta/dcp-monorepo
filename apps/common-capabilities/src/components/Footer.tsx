import React from 'react';
import { GoabAppFooter, GoabAppFooterNavSection } from '@abgov/react-components';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <GoabAppFooter maxContentWidth="1500px">
      <GoabAppFooterNavSection maxColumnCount={1}>
        <Link to="/gettingstarted#getting-started">Getting started</Link>
        <Link to="/about">About</Link>
        <Link to="/ecosystem">Eco-system</Link>
      </GoabAppFooterNavSection>

      <GoabAppFooterNavSection>
        <Link to="/services">Services</Link>
        <Link to="/support">Support</Link>
      </GoabAppFooterNavSection>
    </GoabAppFooter>
  );
};

export default Footer;

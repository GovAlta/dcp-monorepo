import React from 'react';
import { useEffect } from 'react';
import {
  GoAMicrositeHeader,
  GoAAppHeader,
} from '@abgov/react-components';
import { Link } from 'react-router-dom';
import { useAuth } from '../providers/AuthStateProvider';

declare global {
  var adspFeedback: any;
}

const Header = () => {
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    if (
      window.location.hostname ===
        'common-capabilities-dcp-uat.apps.aro.gov.ab.ca' ||
      window.location.hostname === 'common-capabilities.digital.gov.ab.ca'
    ) {
      globalThis.adspFeedback?.initialize?.({
        tenant: 'common_capabilities',
      });
    }
  });

  return (
    <>
      <GoAMicrositeHeader type="live" maxContentWidth="1500px" />
      <GoAAppHeader
        url="/"
        heading="Common capabilities"
        maxContentWidth="1500px"
      >
        <Link to="/gettingstarted#getting-started">Getting started</Link>
        <Link to="/about">About</Link>
        <Link to="/ecosystem">Eco-system</Link>
        <Link to="/services">Services</Link>
        <Link to="/roadmap">Roadmap</Link>
        <Link to="/support">Support</Link>
        {isAuthenticated && <a onClick={logout} href="#">Logout</a>}
      </GoAAppHeader>
    </>
  );
};

export default Header;

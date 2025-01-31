import React, { useState } from 'react';
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

const headerLinks = [
  { label: 'Getting started', href: '/gettingstarted#getting-started' },
  { label: 'About', href: '/about' },
  { label: 'Eco-system', href: '/ecosystem' },
  { label: 'Services', href: '/services' },
  { label: 'Roadmap', href: '/roadmap' },
  { label: 'Support', href: '/support' },
];

const Header = () => {
  const [currentActive, setCurrentActive] = useState(window.location.pathname);
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
        {headerLinks.map((link) => (
          <Link key={link.href} to={link.href} className={currentActive === link.href ? 'current' : ''} onClick={() => setCurrentActive(link.href)}>{link.label}</Link>
        ))}
        {isAuthenticated && <a onClick={logout} href="#">Logout</a>}
      </GoAAppHeader>
    </>
  );
};

export default Header;

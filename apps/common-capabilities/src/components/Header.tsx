import React from 'react';
import {
  GoAMicrositeHeader,
  GoAAppHeader,
} from '@abgov/react-components-4.20.2';

const Header = () => {
  return (
    <>
      <GoAMicrositeHeader type="beta" />
      <GoAAppHeader url="/" heading="Common capabilities" maxContentWidth="95%">
        {/* <a href="/gettingstarted/index.html">Getting started</a> */}
        {/* <a href="/about/index.html">About</a> */}
        {/* <a href="/ecosystem/index.html">Eco-system</a> */}
        <a href="/services/index.html">Services</a>
        <a href="/support/index.html">Support</a>
      </GoAAppHeader>
    </>
  );
};

export default Header;

import React from 'react';
import { useEffect } from 'react';
import {
  GoAMicrositeHeader,
  GoAAppHeader,
} from '@abgov/react-components-4.20.2';

const Header = () => {
  
  useEffect(() => {
    if (globalThis.adspFeedback != undefined) {
      globalThis.adspFeedback.initialize({
        tenant: 'common_capabilities',
      });
    }
  });

  return (
    <>
      <GoAMicrositeHeader type="beta" maxContentWidth="1500px" />
      <GoAAppHeader
        url="/"
        heading="Digital Standards"
        maxContentWidth="1500px"
      >
        <a href="/service-standards/index.html">Standards</a>
        <a href="/service-performance/index.html">Performance</a>
        <a href="/service-glossary/index.html">Glossary</a>
      </GoAAppHeader>
    </>
  );
};

export default Header;

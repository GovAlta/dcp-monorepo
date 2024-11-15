import React from 'react';
import { useEffect } from 'react';
import {
  GoAMicrositeHeader,
  GoAAppHeader,
  GoAIcon,
} from '@abgov/react-components';

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
        <a href="/service-standards/">Standards</a>
        <a href="/service-performance/">Performance</a>
        <a href="/service-glossary/">Glossary</a>
        <a href="/practice-areas/">Practice Areas</a>
        <a href="/search/">
          <GoAIcon type="search" />
        </a>
      </GoAAppHeader>
    </>
  );
};

export default Header;

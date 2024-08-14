import React from 'react';
import {
  GoAMicrositeHeader,
  GoAAppHeader,
  GoAIcon,
} from '@abgov/react-components-4.20.2';

const Header = () => {
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
        <a href="/search/index.html">
          <GoAIcon type="search" />
        </a>
      </GoAAppHeader>
    </>
  );
};

export default Header;

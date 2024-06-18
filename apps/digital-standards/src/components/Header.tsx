import React from 'react';
import {
  GoAMicrositeHeader,
  GoAAppHeader,
} from '@abgov/react-components-4.20.2';

const Header = () => {
  return (
    <>
      <GoAMicrositeHeader type="beta" maxContentWidth="1500px" />
      <GoAAppHeader url="/" heading="Digital strategy" maxContentWidth="1500px">
        <a href="/service-standards/index.html">Service standards</a>
        <a href="/strategy-principals/index.html">Strategy principals</a>
      </GoAAppHeader>
    </>
  );
};

export default Header;

import React from 'react';
import {
  GoAMicrositeHeader,
  GoAAppHeader,
} from '@abgov/react-components-4.20.2';

const Header = () => {
  return (
    <>
      <GoAMicrositeHeader type="beta" maxContentWidth="1500px" />
      <GoAAppHeader url="/" heading="Digital Standards" maxContentWidth="1500px">
        <a href="/service-standards/index.html">Service Standards</a>
      </GoAAppHeader>
    </>
  );
};

export default Header;

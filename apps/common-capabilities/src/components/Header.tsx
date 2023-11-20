import React from 'react';
import {
  GoAMicrositeHeader,
  GoAAppHeader,
  GoAHeroBanner,
  GoAButton,
  GoAButtonGroup,
  GoAHeroBannerActions,
} from '@abgov/react-components';

const Header = ({ actionButtons }: any) => {
  return (
    <>
      <GoAMicrositeHeader type="beta" />
      <GoAAppHeader url="/" heading="Common capabilities" maxContentWidth="95%">
        <a href="/">Home</a>
        <a href="/contact/index.html">Contact</a>
      </GoAAppHeader>
      <GoAHeroBanner
        heading="Common capabilities"
        backgroundUrl=""
        minHeight="20%"
      >
        Reusable services for building your custom apps
        {actionButtons ? (
          <GoAHeroBannerActions>
            <GoAButtonGroup alignment="start">
              <GoAButton
                leadingIcon="arrow-back"
                onClick={() => {
                  window.location.href = '/';
                }}
              >
                Back to services
              </GoAButton>
            </GoAButtonGroup>
          </GoAHeroBannerActions>
        ) : (
          ''
        )}
      </GoAHeroBanner>
    </>
  );
};

export default Header;

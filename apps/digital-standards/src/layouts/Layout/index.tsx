import React from 'react';
import { useEffect } from 'react';
import Header from '../../components/Header';
import {
  GoAThreeColumnLayout,
  GoASideMenu,
  GoASideMenuGroup,
  GoAHeroBanner,
} from '@abgov/react-components-4.20.2';
import Footer from '../../components/Footer';

const Layout = ({ children, hideNav = false, hideHero = true }: any) => {  

  useEffect(() => {
    globalThis.adspFeedback.initialize({
      tenant: 'common_capabilities',
    });
  });


  return (
    <>
      <section id="top-page"></section>
      <Header />
      {hideHero ? null : (
        <GoAHeroBanner
          heading="Digital Service Standards"
          maxContentWidth="785px"
        >
          <p>
            By aligning to digital service standards, the Government of Alberta
            sets clear expectations on how we will deliver better, faster,
            smarter services.
          </p>
        </GoAHeroBanner>
      )}

      <GoAThreeColumnLayout
        maxContentWidth="1540px"
        rightColumnWidth="30ch"
        leftColumnWidth="35ch"
        nav={
          hideNav ? null : (
            <div>
              <GoASideMenu>
                <GoASideMenuGroup heading="Digital Service Standards Program">
                  <a href="/service-standards/index.html">
                    Digital Service Standards
                  </a>
                  <a href="/service-principles/index.html">
                    Digital Service Principles
                  </a>
                  <a href="/service-help/index.html">
                    How Digital Service Standards team can help
                  </a>
                  <a href="/service-performance/index.html">
                    Service Performance
                  </a>
                </GoASideMenuGroup>
              </GoASideMenu>
            </div>
          )
        }
      >
        {children}
      </GoAThreeColumnLayout>
      <Footer />
    </>
  );
};

export default Layout;

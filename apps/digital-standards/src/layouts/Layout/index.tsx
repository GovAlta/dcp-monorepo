import React from 'react';
import Header from '../../components/Header';
import {
  GoAThreeColumnLayout,
  GoASideMenu,
  GoASideMenuGroup,
} from '@abgov/react-components-4.20.2';
import Footer from '../../components/Footer';

const Layout = ({ children, hideNav = false }: any) => {
  return (
    <>
      <section id="top-page"></section>
      <Header />
      <GoAThreeColumnLayout
        maxContentWidth="1540px"
        rightColumnWidth="30ch"
        leftColumnWidth="33ch"
        nav={
          hideNav ? null : (
            <div>
              <GoASideMenu>
                <GoASideMenuGroup heading="Digital Service Standards">
                  <a href="/service-standards/index.html">
                    Digital Service Standards
                  </a>
                  <a href="/strategy-principals/index.html">
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

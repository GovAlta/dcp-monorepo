import React from 'react';
import Header from '../../components/Header';
import {
  GoAThreeColumnLayout,
  GoASideMenu,
  GoASideMenuGroup,
  GoAHeroBanner,
} from '@abgov/react-components';
import Footer from '../../components/Footer';

const Layout = ({ children, hideNav = false, hideHero = true }: any) => {
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
                  <a href="/service-standards/">
                    Digital Service Standards
                  </a>
                  <a href="/service-principles/">
                    Digital Service Principles
                  </a>
                  <a href="/service-help/">
                    How Digital Service Standards team can help
                  </a>
                  <a href="/service-performance/">
                    Service Performance
                  </a>
                  <a href="/service-assessments/">
                    Service Assessments
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

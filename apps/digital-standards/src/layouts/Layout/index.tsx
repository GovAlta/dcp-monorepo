import React from 'react';
import Header from '../../components/Header';
import {
  GoabThreeColumnLayout,
  GoabSideMenu,
  GoabSideMenuGroup,
  GoabHeroBanner,
} from '@abgov/react-components';
import Footer from '../../components/Footer';

type Props = {
  children: React.ReactNode;
  hideNav?: boolean;
  hideHero?: boolean;
};

const Layout = ({ children, hideNav = false, hideHero = true }: Props) => {
  return (
    <>
      <section id="top-page"></section>
      <Header />
      {hideHero ? null : (
        <GoabHeroBanner
          heading="Digital Service Standards"
          maxContentWidth="785px"
        >
          <p>
            By aligning to digital service standards, the Government of Alberta
            sets clear expectations on how we will deliver better, faster,
            smarter services.
          </p>
        </GoabHeroBanner>
      )}

      <GoabThreeColumnLayout
        maxContentWidth="1540px"
        rightColumnWidth="30ch"
        leftColumnWidth="35ch"
        nav={
          hideNav ? null : (
            <div>
              <GoabSideMenu>
                <GoabSideMenuGroup heading="Digital Service Standards Program">
                  <a href="/service-standards/">Digital Service Standards</a>
                  <a href="/service-principles/">Digital Service Principles</a>
                  <a href="/service-help/">
                    How Digital Service Standards team can help
                  </a>
                  <a href="/service-performance/">Service Performance</a>
                  <a href="/service-assessments/">Service Assessments</a>
                  <a href="/digital-capabilities/">
                    Digital Capability Program
                  </a>
                </GoabSideMenuGroup>
              </GoabSideMenu>
            </div>
          )
        }
      >
        {children}
      </GoabThreeColumnLayout>
      <Footer />
    </>
  );
};

export default Layout;

import { GoASideMenu, GoAThreeColumnLayout } from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import { sideNavItems } from './config';
import './styles.css';
import BackToTop from '../../components/BackToTop';
import GettingStarted from './content/GettingStarted';
import Glossary from './content/Glossary';
import FAQ from './content/FAQ';

export default function GettingStartedPage(): JSX.Element {
  const [activeSection, setActiveSection] = useState('getting-started');

  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      setActiveSection(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);

  return (
    <GoAThreeColumnLayout
      maxContentWidth="1550px"
      rightColumnWidth="8%"
      nav={
        <GoASideMenu>
          {sideNavItems.map((item) => (
            <a
              href={`#${item.id}`}
              key={item.id}
              onClick={() => setActiveSection(item.id)}
            >
              {item.title}
            </a>
          ))}
        </GoASideMenu>
      }
    >
      <>
        {activeSection === 'getting-started' && <GettingStarted />}
        {activeSection === 'glossary' && <Glossary />}
        {activeSection === 'faq' && <FAQ />}
        <BackToTop />
      </>
    </GoAThreeColumnLayout>
  );
}

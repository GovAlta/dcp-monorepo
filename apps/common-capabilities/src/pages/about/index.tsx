import {
  GoASideMenu,
  GoASpacer,
  GoAThreeColumnLayout,
} from '@abgov/react-components-4.20.2';
import React, { useEffect } from 'react';
import { aboutPageContent } from './content';

export default function AboutPage(): JSX.Element {
  useEffect(() => {
    if (window.location.hash) {
      const elmnt = document.getElementById(window.location.hash.substring(1));
      elmnt?.scrollIntoView(true);
    }
  }, []);
  return (
    <GoAThreeColumnLayout
      maxContentWidth="1550px"
      rightColumnWidth='8%'
      leftColumnWidth='18%'
      nav={
        <GoASideMenu>
          {aboutPageContent.map((section) => (
            <a href={`#${section.id}`} key={section.id}>
              {section.title}
            </a>
          ))}
        </GoASideMenu>
      }
    >
      <h1>About</h1>
      {aboutPageContent.map((section) => (
        <>
          <React.Fragment key={section.title}>
            <h2 id={section.id}>{section.title}</h2>
            {section.content}
          </React.Fragment>
          <GoASpacer vSpacing="l" />
        </>
      ))}
    </GoAThreeColumnLayout>
  );
}

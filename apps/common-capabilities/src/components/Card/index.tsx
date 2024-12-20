import {
  GoAContainer,
  GoASpacer,
  GoABadge,
} from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import './styles.css';
import type { array } from 'astro/zod';

import { ServiceRoadmap } from '../../utils/roadmap'

interface CardProps {  
  app: any;
  roadmapMode: any;
  roadmapHistory: any;  
}

// interface CardProps {
//   provider: string;
//   description: string;
//   title: string;
//   app: any;
//   roadmapMode: any;
//   roadmapHistory: any;  
// }

  //const Card = ({ provider, description, title, app, roadmapMode, roadmapHistory }: CardProps) => {
  const Card = ({ app, roadmapMode, roadmapHistory }: CardProps) => {
  const maxDescriptionLength = 200; // word length for short descpription in tile.
  const badgesToShow = ['status']; //, 'FunctionalGroup', 'Language', 'Keywords'];
  const [showBadges, setShowBadges] = useState<JSX.Element[]>([]);
  const [roadmapItems, setRoadmapItems] = useState<React.ReactNode | undefined>(undefined);

  function badgeType(value:any) {    
    if (value == 'Live')
      return "success"
    else      
      return "midtone"
  }
  
  useEffect(() => {    
    let badges: JSX.Element[] = [];
    if (app.recommended) {
      badges.push(
        <GoABadge key="recommended" type="information" content="Recommended" />
      );
    }
  
    badgesToShow.forEach((badge) => {
      if (app[badge] !== '' && app[badge]?.length > 0) {
        if (
          typeof app[badge] === 'string' &&
          app[badge].toLowerCase() !== 'other'
        ) {
          badges.push(
            <GoABadge key={badge} type={badgeType(app[badge])} content={app[badge]} />
          );
        }
      }
    });
    setShowBadges(badges);        
    setRoadmapItems(<ServiceRoadmap roadmapItems={app.roadmap} roadmapMode={roadmapMode} showHistory={roadmapHistory} />)
    
  }, [app,roadmapHistory]);

  return (    
    <GoAContainer accent="thin">

      <div id="service-tile-chips">
        {<div id="service-tile-chips">{showBadges}</div>}
      </div>

      {/* <a id="service-tile-title" href={`/services/details/index.html?id=${app.appId}`} > {title} </a>      
      <br /> */}
      <a id="service-tile-title"
       href={`/details/index.html?id=${app.appId}`} > {app.serviceName} </a>      

      <GoASpacer vSpacing="m" />
      <p id="service-tile-content">
        {`${app.summary.substring(0, maxDescriptionLength)}${app.summary.length > maxDescriptionLength ? '.....' : ''}`}
      </p>
      <GoASpacer vSpacing="xs" />
      {roadmapItems}      
    </GoAContainer>    
  );
};
export default Card;

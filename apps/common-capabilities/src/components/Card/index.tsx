import {
  GoAContainer,
  GoASpacer,
  GoABadge,
} from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import './styles.css';
import { ServiceRoadmap } from './ServiceRoadmap'
import { Link } from 'react-router-dom';

interface CardProps {  
  app: any;
  roadmapMode: any;
  roadmapHistory: any;  
  condensed:any;
}

const Card = ({ app, roadmapMode, roadmapHistory, condensed }: CardProps) => {
  const maxDescriptionLength = 200; // word length for short descpription in tile.
  const badgesToShow = ['status'];
  const [showBadges, setShowBadges] = useState<JSX.Element[]>([]);
  
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
  }, [app,roadmapHistory]);

  return (    
    <GoAContainer accent="thin">

      {(!condensed) ? <>
      <div id="service-tile-chips">
        {<div id="service-tile-chips">{showBadges}</div>}
      </div>
      </> : <></> }

      <Link id="service-tile-title"
       to={`/details/${app.appId}`} > {app.serviceName} </Link>      

      {(!condensed) ? <>
      <GoASpacer vSpacing="m" />
      <p id="service-tile-content">
        {`${app.summary.substring(0, maxDescriptionLength)}${app.summary.length > maxDescriptionLength ? '.....' : ''}`}
      </p>
      </> : <></> }
      <GoASpacer vSpacing="xs" />
      <ServiceRoadmap roadmapItems={app.roadmap} roadmapMode={roadmapMode} showHistory={roadmapHistory} condensed={condensed} />      
    </GoAContainer>    
  );
};
export default Card;

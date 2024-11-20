import {
  GoAContainer,
  GoASpacer,
  GoAChip,
  GoABadge,
} from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import ExternalLink from '../../components/ExternalLink';
import './styles.css';
interface CardProps {
  provider: string;
  description: string;
  title: string;
  app: any;
}

const Card = ({ provider, description, title, app }: CardProps) => {
  const maxDescriptionLength = 200; // word length for short descpription in tile.
  const badgesToShow = ['Status']; //, 'FunctionalGroup', 'Language', 'Keywords'];
  const [showBadges, setShowBadges] = useState<JSX.Element[]>([]);

  function badgeType(value:any) {    
    if (value == 'Live')
      return "success"
    else      
      return "midtone"
  }
  
  useEffect(() => {    
    let badges: JSX.Element[] = [];
    if (app.InternalWeightage >= 50) {
      badges.push(
        <GoABadge key="recommended" type="information" content="Recommended" />
      );
    }
  
    badgesToShow.forEach((badge) => {
      if (app[badge] !== '' && app[badge]?.length > 0) {
        // if (
        //   Array.isArray(app[badge]) &&
        //   !app[badge].some((item: string) => item.toLowerCase() === 'other')
        // ) {          
        //   app[badge].forEach((badgeValue: string) => {
        //     badges.push(
        //       <GoABadge
        //         key={badgeValue}
        //         type="information"
        //         content={badgeValue}
        //       />
        //     );
        //   });
        // }

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
  }, [app]);

  return (    
    <GoAContainer accent="thin">

      <div id="service-tile-chips">
        {<div id="service-tile-chips">{showBadges}</div>}
      </div>

      <a id="service-tile-title"
        href={`/services/details/index.html?id=${app.appId}`} >
        {title}        
      </a>      
      <GoASpacer vSpacing="m" />
      <p id="service-tile-content">
        {`${description.substring(0, maxDescriptionLength)}${description.length > maxDescriptionLength ? '.....' : ''}`}
      </p>     
    </GoAContainer>    
  );
};
export default Card;

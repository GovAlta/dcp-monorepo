import { GoAContainer, GoASpacer, GoABadge } from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import './styles.css';
import { ServiceRoadmap } from './ServiceRoadmap';
import { Link } from 'react-router-dom';
import { Service, ServiceAttribute } from '../../types/types';

interface CardProps {
  app: Service;
  roadmapMode?: string;
  roadmapHistory?: boolean;
  condensed?: boolean;
}

const Card = ({ app, roadmapMode, roadmapHistory, condensed }: CardProps) => {
  const maxDescriptionLength = 200; // word length for short descpription in tile.
  const badgesToShow = ['status'] as [ServiceAttribute];
  const [showBadges, setShowBadges] = useState<JSX.Element[]>([]);

  function badgeType(value: string) {
    if (value == 'Live') return 'success';
    else return 'midtone';
  }

  useEffect(() => {
    const badges: JSX.Element[] = [];
    if (app.recommended) {
      badges.push(
        <GoABadge key="recommended" type="information" content="Recommended" />,
      );
    }

    badgesToShow.forEach((badge) => {
      const badgeValue = app[badge] as string;
      if (
        typeof badgeValue === 'string' &&
        badgeValue?.length > 0 &&
        badgeValue.toLowerCase() !== 'other'
      ) {
        badges.push(
          <GoABadge
            key={badge}
            type={badgeType(badgeValue)}
            content={badgeValue}
          />,
        );
      }
    });
    setShowBadges(badges);
  }, [app, roadmapHistory]);

  return (
    <GoAContainer accent="thin">
      {!condensed ? (
        <div id="service-tile-chips">
          {<div id="service-tile-chips">{showBadges}</div>}
        </div>
      ) : (
        <></>
      )}

      <Link id="service-tile-title" to={`/details/${app.appId}`}>
        {' '}
        {app.serviceName}{' '}
      </Link>

      {!condensed ? (
        <>
          <GoASpacer vSpacing="m" />
          <p id="service-tile-content">
            {`${app.summary.substring(0, maxDescriptionLength)}${app.summary.length > maxDescriptionLength ? '.....' : ''}`}
          </p>
        </>
      ) : (
        <></>
      )}
      <GoASpacer vSpacing="xs" />
      <ServiceRoadmap
        roadmapItems={app.roadmap}
        roadmapMode={roadmapMode}
        showHistory={roadmapHistory}
        condensed={condensed}
      />
    </GoAContainer>
  );
};
export default Card;

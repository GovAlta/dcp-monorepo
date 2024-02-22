import {
  GoAContainer,
  GoASpacer,
  GoAChip,
  GoABadge,
} from '@abgov/react-components';
import React, { useEffect, useState } from 'react';
import ExternalLink from '../ExternalLink';
import './styles.css';
interface CardProps {
  provider: string;
  description: string;
  title: string;
  app: any;
}

const Card = ({ provider, description, title, app }: CardProps) => {
  const maxDescriptionLength = 200; // word length for short descpription in tile.
  const badgesToShow = ['Status', 'FunctionalGroup', 'Language', 'Keywords'];
  const [showBadges, setShowBadges] = useState<JSX.Element[]>([]);

  useEffect(() => {
    let badges: JSX.Element[] = [];
    if (app.InternalWeightage >= 50) {
      badges.push(
        <GoABadge key="validated" type="midtone" content="Validated" />
      );
    }

    badgesToShow.forEach((badge) => {
      if (app[badge] !== '' && app[badge]?.length > 0) {
        if (
          Array.isArray(app[badge]) &&
          !app[badge].some((item: string) => item.toLowerCase() === 'other')
        ) {
          app[badge].forEach((badgeValue: string) => {
            badges.push(
              <GoABadge key={badgeValue} type="information" content={badgeValue} />
            );
          });
        }
        if (
          typeof app[badge] === 'string' &&
          app[badge].toLowerCase() !== 'other'
        ) {
          badges.push(
            <GoABadge key={badge} type="information" content={app[badge]} />
          );
        }
      }
    });

    setShowBadges(badges);
  }, [app]);

  return (
    // <div>
    <GoAContainer accent="thin">
      <a
        id="service-tile-title"
        href={`/${title.toLocaleLowerCase().replace(/ |\//g, '-')}/index.html`}
      >
        {title}
      </a>

      <span id="service-tile-subtitle">{provider}</span>
      <GoASpacer vSpacing="m" />
      <p id="service-tile-content">{`${description.substring(
        0,
        maxDescriptionLength
      )}${description.length > maxDescriptionLength ? '.....' : ''}`}</p>
      {app.Email !== '' ? (
        <div>
          <b>Contact: </b>
          <ExternalLink link={`mailto:${app.Email}`} text={app.Provider} />{' '}
        </div>
      ) : (
        ''
      )}

      <GoASpacer vSpacing="m" />
      <div id="service-tile-chips">
        {<div id="service-tile-chips">{showBadges}</div>}
      </div>
    </GoAContainer>
    // </div>
  );
};
export default Card;

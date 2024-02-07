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
  const [items, setItems] = useState<any>({
    badges: [],
  });
  useEffect(() => {
    let showBadges: any[] = [];
    badgesToShow.map((badge) => {
      if (app[badge] !== '' && app[badge]?.length > 0) {
        if (Array.isArray(app[badge]) && !app[badge].includes('other')) {
          showBadges.push(badge);
        }
        if (typeof app[badge] === 'string' && app[badge] !== 'other') {
          showBadges.push(badge);
        }
      }
    });
    setItems({
      badges: showBadges,
    });
  }, []);
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
        {items.badges.length > 0
          ? items.badges.map((badge: string) => {
              return typeof app[badge] === 'string' ? (
                <div key={`${badge}`}>
                  <GoABadge type="information" content={app[badge]} />
                </div>
              ) : (
                app[badge].map((item: string) => (
                  <div key={`${item}`}>
                    <GoABadge type="information" content={item} />
                  </div>
                ))
              );
            })
          : ''}
      </div>
    </GoAContainer>
    // </div>
  );
};
export default Card;

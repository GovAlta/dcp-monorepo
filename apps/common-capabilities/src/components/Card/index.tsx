import { GoAContainer, GoASpacer, GoAChip } from '@abgov/react-components';
import React from 'react';
import ExternalLink from '../ExternalLink';
import './styles.css';
interface CardProps {
  provider: string;
  description: string;
  title: string;
}

const Card = ({ provider, description, title }: CardProps) => {
  return (
    // <div>
      <GoAContainer accent="thin">
        <a id="service-tile-title">{title}</a>
        <span id="service-tile-subtitle">{provider}</span>
        <GoASpacer vSpacing="m" />
        <p id="service-tile-content">{description}</p>

        <div>
          <b>Contact:</b>
          <ExternalLink text="ADSP platform" link="https://google.ca" />
        </div>
        <GoASpacer vSpacing="m" />
        <div id="service-tile-chips">
          <GoAChip mr="s" content="Chip Text" />
          <GoAChip mr="s" content="Chip Text" />
          <GoAChip mr="s" content="Chip Text" />
        </div>
      </GoAContainer>
    // </div>
  );
};
export default Card;

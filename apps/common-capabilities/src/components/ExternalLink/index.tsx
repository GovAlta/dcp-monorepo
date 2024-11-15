import { GoAIcon } from '@abgov/react-components';
import React from 'react';
import './styles.css';

interface LinkProps {
  link: string;
  text: string;
  newTab?: boolean;
}

const ExternalLink = ({ link, text, newTab = true }: LinkProps) => {
  const target = newTab ? '_blank' : '_self';
  const relValue = newTab ? 'noopener noreferrer' : '';

  return (
    <div className="link-wrapper">
      <a href={link} rel={relValue} target={target}>
        {text}
        {newTab && (
          <span className="link-icon">
            <GoAIcon type="open" size="small" />
          </span>
        )}
      </a>
    </div>
  );
};
export default ExternalLink;

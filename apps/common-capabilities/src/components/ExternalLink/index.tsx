import { GoAIcon } from '@abgov/react-components';
import React from 'react';
import './styles.css';
interface LinkProps {
  link: string;
  text: string;
}

const ExternalLink = ({ link, text }: LinkProps) => {
  return (
    <div className="link-wrapper">
      <a href={link} rel="noopener noreferrer" target="_blank">
        {text}
        <span className="link-icon">
          <GoAIcon type="open" />
        </span>
      </a>
    </div>
  );
};
export default ExternalLink;

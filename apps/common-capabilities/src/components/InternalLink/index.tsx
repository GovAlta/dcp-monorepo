import { GoAIcon } from '@abgov/react-components';
import React from 'react';
import './styles.css';

interface LinkProps {
  link: string;
  text: string;
  icon?: boolean;
}

const InternalLink = ({ link, text, icon = true }: LinkProps) => {

  return (
    <div className="link-wrapper">
      <a href={link} target={'_self'}>
        {text}
        {icon && (
          <span className="link-icon">
            <GoAIcon type="arrow-forward" size="small" ></GoAIcon>
          </span>
        )}
      </a>
    </div>
  );
};
export default InternalLink;

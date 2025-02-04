import { GoAIcon } from '@abgov/react-components';
import React from 'react';
import './styles.css';
import { Link } from 'react-router-dom';

interface LinkProps {
  link: string;
  text: string;
  icon?: boolean;
}

const InternalLink = ({ link, text, icon = true }: LinkProps) => {

  return (
    <div className="link-wrapper">
      <Link to={link}>
        {text}
        {icon && (
          <span className="link-icon">
            <GoAIcon type="arrow-forward" size="small" ></GoAIcon>
          </span>
        )}
      </Link>
    </div>
  );
};
export default InternalLink;

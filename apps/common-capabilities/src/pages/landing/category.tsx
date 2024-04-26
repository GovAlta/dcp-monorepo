import React from 'react';
import ExternalLink from '../../components/ExternalLink';

interface Props {
  title: string;
  description: string;
  link: string;
}

const Category: React.FC<Props> = ({ title, description, link }) => {
  return (
    <div>
      <h3>{title}</h3>
      <p>{description}</p>
      <ExternalLink text={title} link={link} />
    </div>
  );
};

export default Category;

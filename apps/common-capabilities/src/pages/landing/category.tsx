import React from 'react';
// import ExternalLink from '../../components/ExternalLink';
import InternalLink from '../../components/InternalLink';

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
      <InternalLink text={'View'} link={link} icon={true} />      
    </div>
  );
};

export default Category;

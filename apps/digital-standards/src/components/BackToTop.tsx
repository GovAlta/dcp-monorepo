import { GoAIcon } from '@abgov/react-components-4.20.2';
import React from 'react';

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="line-elements back-top">
      <a onClick={scrollToTop}>Back to top</a>
      <GoAIcon type="arrow-up-circle" theme="outline" />
    </div>
  );
};

export default BackToTop;

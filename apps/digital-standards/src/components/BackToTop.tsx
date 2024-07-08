import { GoAIcon } from '@abgov/react-components-4.20.2';
import React from 'react';

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className='back-top'>
    <a onClick={scrollToTop} className='vtop'>Back to top </a> 
    <a onClick={scrollToTop}><GoAIcon type="arrow-up-circle" theme="outline" /> </a>
    </div>
  );
};

export default BackToTop;

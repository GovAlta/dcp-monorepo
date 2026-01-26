import { GoabButton } from '@abgov/react-components';
import React from 'react';

const BackToTop = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="back-top">
      <GoabButton
        type="tertiary"
        size="compact"
        trailingIcon="arrow-up-circle"
        onClick={scrollToTop}
      >
        Back to top
      </GoabButton>
    </div>
  );
};

export default BackToTop;

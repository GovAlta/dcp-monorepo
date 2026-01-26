import React from 'react';
import { GoabHeroBanner } from '@abgov/react-components';

interface HeroBannerWrapperProps {
  title: string;
  backgroundUrl: string;
}

export default function HeroBannerWrapper({
  title,
  backgroundUrl,
}: HeroBannerWrapperProps) {
  return (
    <GoabHeroBanner heading="" backgroundUrl={backgroundUrl}>
      {title === 'Home' ? (
        <div>
          <h1>
            Government of Alberta
            <br /> Digital Delivery Playbook
          </h1>
          <h4>
            <strong>
              Using modern digital delivery practices for modern public
              services.
            </strong>
          </h4>
        </div>
      ) : (
        <h1>{title}</h1>
      )}
    </GoabHeroBanner>
  );
}

import React, { useEffect, useState } from 'react';
import {
  GoASpacer,
  GoAThreeColumnLayout
} from '@abgov/react-components';
import './styles.css';

export default function ContactPage(): JSX.Element {

  return (
    <div
      style={{
        padding: '0px 68px',
      }}
    >
      <GoAThreeColumnLayout>
        <h2>Common capabilities contact</h2>
        <GoASpacer vSpacing="2xl" />
        <h3>Frequently asked questions</h3>
      </GoAThreeColumnLayout>
    </div>
  );
}
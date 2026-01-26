import React from 'react';
import { GoabButton } from '@abgov/react-components';

type BackButtonProps = {
  text?: string;
  onClick?: () => void;
};

export default function BackButton({ text, onClick }: BackButtonProps) {
  return (
    <GoabButton
      type="tertiary"
      size="compact"
      leadingIcon="arrow-back"
      onClick={onClick}
    >
      {text}
    </GoabButton>
  );
}

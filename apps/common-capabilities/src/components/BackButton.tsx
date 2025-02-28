import React from 'react';
import { GoAButton } from '@abgov/react-components';

type BackButtonProps = {
    text?: string;
    onClick?: () => void;
};

export default function BackButton({ text, onClick }: BackButtonProps) {
    return (
        <GoAButton
            type="tertiary"
            size="compact"
            leadingIcon="arrow-back"
            onClick={onClick}
        >
            {text}
        </GoAButton>
    );
}

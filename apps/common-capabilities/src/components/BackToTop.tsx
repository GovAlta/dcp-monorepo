import { GoAButton } from '@abgov/react-components';
import React from 'react';

const BackToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };
    return (
        <div className="back-top">
            <GoAButton
                type="tertiary"
                size="compact"
                trailingIcon="arrow-up-circle"
                onClick={scrollToTop}
            >
                Back to top
            </GoAButton>
        </div>
    );
};

export default BackToTop;

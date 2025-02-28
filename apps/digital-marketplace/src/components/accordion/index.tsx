import React, { useState } from 'react';
import './styles.css';
import open_icon from '../../img/goa-accordion-open-icon.svg';
import close_icon from '../../img/goa-accordion-close-icon.svg';

interface AccordionProps {
    title: string;
    content: React.ReactNode;
}

const Accordion: React.FC<AccordionProps> = ({ title, content }) => {
    const [isActive, setIsActive] = useState(false);

    return (
        <div className="goa-adm-accordion-item">
            <button
                className="goa-adm-accordion-title"
                aria-expanded={isActive ? 'true' : 'false'}
                onClick={() => setIsActive(!isActive)}
            >
                <div>{title}</div>
                <div className="goa-adm-accordion-icon">
                    <img
                        src={isActive ? close_icon.src : open_icon.src}
                        alt={
                            isActive
                                ? 'Close accordion panel'
                                : 'Open accordion panel'
                        }
                    />
                </div>
            </button>
            <div
                className={
                    isActive
                        ? 'goa-adm-accordion-content expanded'
                        : 'goa-adm-accordion-content'
                }
            >
                {content}
            </div>
        </div>
    );
};

export default Accordion;

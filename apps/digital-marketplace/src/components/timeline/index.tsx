import React from 'react';
import './styles.css';

interface TimelineProps {
    number: number;
    heading: string;
    content: React.ReactNode;
}

const Timeline: React.FC<TimelineProps> = ({ number, heading, content }) => {
    return (
        <div className="goa-adm-timeline-item">
            <div className="goa-adm-timeline-heading">
                <div className="goa-adm-timeline-id">{number}</div>
                <div className="goa-adm-timeline-title">{heading}</div>
            </div>
            <div className="goa-adm-timeline-content">{content}</div>
        </div>
    );
};

export default Timeline;

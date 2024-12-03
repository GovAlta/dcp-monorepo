import React from 'react';
import { GoAAccordion } from '@abgov/react-components';
import './styles.css';

type RoadmapProps = {
    roadmap: {
        when: string;
        title: string;
        type: string;
        status: string;
        impacts: string;
    }[];
}

const getImpactItems = (impacts: string) => {
    if (!impacts) {
        return null;
    }

    return (
        <ul>
            {impacts?.split('\n').map((impact: any) => (
                <li key={impact}>{impact}</li>
            ))}
        </ul>
    );
}

export default function Roadmap({ roadmap }: RoadmapProps) {
    const content = roadmap?.map((item, index) => (
        <GoAAccordion key={index} heading={`${item.when} - ${item.title}`}>
              <dl className='roadmap-details'>
                <dt>Type</dt>
                <dd>{item.type || 'N/A'}</dd>
                <dt>Status</dt>
                <dd>{item.status || 'N/A'}</dd>
                <dt>Impact</dt>
                <dd className="roadmap-impacts">{item.impacts ? getImpactItems(item.impacts) : 'None'}</dd>
            </dl>
        </GoAAccordion>
    ));

    return roadmap ? content : null;
};
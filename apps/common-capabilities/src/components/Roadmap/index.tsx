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
        description: string
    }[];
}

const roadmapDetailsConfig = [
    {title: 'Type:', getValue: (data: any) => data.type || 'N/A', inlineTitle: true},
    {title: 'Status:', getValue: (data: any) => data.status || 'N/A', inlineTitle: true},
    {title: 'Description', getValue: (data: any) => data.description || 'N/A'},
    {title: 'Impacts', getValue: (data: any) => data.impacts ? getImpactItems(data.impacts) : 'None'}
];

const getImpactItems = (impacts: string) => {
    if (!impacts) {
        return null;
    }

    return (
        <ul>
            {impacts?.split('\n').map((impact: any) => {
                return (impact && impact.trim().length > 0) ? <li key={impact}>{impact}</li> : null;
            })}
        </ul>
    );
}

export default function Roadmap({ roadmap }: RoadmapProps) {
    const content = roadmap?.map((item, index) => (
        <GoAAccordion key={index} heading={`${item.when} - ${item.title}`}>
              <dl className='roadmap-details'>
                {
                    roadmapDetailsConfig.map(({title, getValue, inlineTitle}) => (
                        <>
                            <dt className={inlineTitle ? 'inline-title' : ''}>{title}</dt>
                            <dd>{getValue(item)}</dd>
                        </>
                        
                    ))
                }
            </dl>
        </GoAAccordion>
    ));

    return roadmap ? content : null;
};
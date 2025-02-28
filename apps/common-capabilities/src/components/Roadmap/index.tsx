import React from 'react';
import { GoAAccordion } from '@abgov/react-components';
import './styles.css';
import { Roadmap as ServiceRoadMap } from '../../types/types';

type RoadmapProps = {
  roadmap: ServiceRoadMap[];
};

const roadmapDetailsConfig = [
  {
    title: 'Type:',
    getValue: (data: ServiceRoadMap) => data.type || 'N/A',
    inlineTitle: true,
  },
  {
    title: 'Status:',
    getValue: (data: ServiceRoadMap) => data.status || 'N/A',
    inlineTitle: true,
  },
  {
    title: 'Description',
    getValue: (data: ServiceRoadMap) => data.description || 'N/A',
  },
  {
    title: 'Impacts',
    getValue: (data: ServiceRoadMap) =>
      data.impacts ? getImpactItems(data.impacts) : 'None',
  },
];

const getImpactItems = (impacts: string) => {
  if (!impacts) {
    return null;
  }

  return (
    <ul>
      {impacts?.split('\n').map((impact: string) => {
        return impact && impact.trim().length > 0 ? (
          <li key={impact}>{impact}</li>
        ) : null;
      })}
    </ul>
  );
};

export default function Roadmap({ roadmap }: RoadmapProps) {
  const sortedData = [...roadmap].sort((a, b) => {
    const parseWhen = (when: string) => {
      if (when === 'TBD') return Infinity;
      const [year, quarter] = when.split(' ');
      return parseInt(year) * 10 + parseInt(quarter.replace('Q', ''));
    };
    return parseWhen(a.when) - parseWhen(b.when);
  });

  const content = sortedData?.map((item, index) => (
    <GoAAccordion key={index} heading={`${item.when} - ${item.title}`}>
      <dl className="roadmap-details">
        {roadmapDetailsConfig.map(({ title, getValue, inlineTitle }) => (
          <>
            <dt className={inlineTitle ? 'inline-title' : ''}>{title}</dt>
            <dd>{getValue(item)}</dd>
          </>
        ))}
      </dl>
    </GoAAccordion>
  ));

  return roadmap ? (
    <GoAAccordion heading={`${roadmap.length} Roadmap items`}>
      {content}
    </GoAAccordion>
  ) : null;
}

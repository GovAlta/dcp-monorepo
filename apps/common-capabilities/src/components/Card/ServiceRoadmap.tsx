import React from 'react';
import { Roadmap, Service } from '../../types/types';

interface Props {
  roadmapItems: Roadmap[];
  roadmapMode?: string;
  showHistory?: boolean;
  condensed?: boolean;
}

const MAX_VISIBLE_ROADMAP_ITEMS = 3;

const getVisibleRoadmapItems = (
  roadmapItems: Roadmap[],
  getVisibleItems?: (roadmapItem: Roadmap) => JSX.Element,
) => {
  const visibleItems = [];

  for (
    let i = 0;
    i < roadmapItems.length && visibleItems.length < MAX_VISIBLE_ROADMAP_ITEMS;
    i++
  ) {
    const item = roadmapItems[i];

    if (getVisibleItems) {
      visibleItems.push(getVisibleItems(item));
    } else {
      visibleItems.push(<li>{item?.title}</li>);
    }
  }

  const remainingItemsCount = roadmapItems.length - visibleItems.length;
  if (remainingItemsCount > 0) {
    visibleItems.push(<strong>(and {remainingItemsCount} more...)</strong>);
  }

  return visibleItems;
};

const parseWhen = (when: string) => {
  if (when === 'TBD') {
    return { year: Infinity, quarter: Infinity }; // Ensure TBD is sorted last
  }
  const [year, quarter] = when.split('Q').map((item) => item.trim());
  return { year: parseInt(year, 10), quarter: parseInt(quarter, 10) };
};

const getCurrentFiscalQuarter = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1; // JavaScript months are 0-based

  const fiscalYear = month >= 4 ? year : year - 1; // Fiscal year starts in April
  const fiscalQuarter = Math.ceil(((month - 3) % 12) / 3) || 4; // Adjust for fiscal quarters

  return { fiscalYear, fiscalQuarter };
};

const roadmapSortFunc = (a: string, b: string) => {
  const aParsed = parseWhen(a);
  const bParsed = parseWhen(b);

  // Sort by year first, then by quarter
  if (aParsed.year !== bParsed.year) {
    return aParsed.year - bParsed.year;
  }

  return aParsed.quarter - bParsed.quarter;
};

const roadmapFilterFunc = (when: string) => {
  if (when === 'TBD') return true; // Always include TBD

  const { year, quarter } = parseWhen(when);

  return year > fiscalYear || (year === fiscalYear && quarter >= fiscalQuarter);
};

const { fiscalYear, fiscalQuarter } = getCurrentFiscalQuarter();

export const roadmapList = (data: Service[], history: boolean) => {
  const allWhenValues: string[] = data.flatMap(
    (obj: Service) => obj.roadmap?.map((item: Roadmap) => item.when) || [],
  );

  const roadMapWhenList = [...new Set(allWhenValues)].sort(roadmapSortFunc);

  if (history) {
    return roadMapWhenList;
  }

  // Filter out older events
  return roadMapWhenList.filter(roadmapFilterFunc);
};

export const ServiceRoadmap: React.FC<Props> = (props) => {
  if (!props?.roadmapMode || !props?.roadmapItems?.length) {
    return null;
  }

  const when = props.roadmapMode == 'list' ? '' : props.roadmapMode;
  if (when !== '') {
    const roadmapItems = props.roadmapItems.filter(
      (item) => item.when === when,
    );

    return getVisibleRoadmapItems(roadmapItems);
  }

  const hideOldRecords = !props.showHistory;
  const roadmapItems = props.roadmapItems.sort((a: Roadmap, b: Roadmap) =>
    roadmapSortFunc(a.when, b.when),
  );
  const filterOldRecords = (roadmap: Roadmap[]) =>
    roadmap.filter((item) => roadmapFilterFunc(item.when));
  const visibleItems = hideOldRecords
    ? filterOldRecords(roadmapItems)
    : roadmapItems;

  return (
    <div>
      {props.condensed ? '' : <b>Roadmap: </b>}
      <ul>
        {getVisibleRoadmapItems(visibleItems, (item) => (
          <li key={`${item.when}-${item.title}`}>
            <strong>{item.when}:</strong> {item.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

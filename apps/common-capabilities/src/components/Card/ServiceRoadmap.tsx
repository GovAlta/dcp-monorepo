import React from 'react';

interface RoadmapItem {
  when: string;
  title: string;
}  

interface Props {
  roadmapItems: RoadmapItem[];
  roadmapMode?:string;
  showHistory?:boolean;
  condensed?:boolean;
}

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

  let fiscalYear = month >= 4 ? year : year - 1; // Fiscal year starts in April
  let fiscalQuarter = Math.ceil(((month - 3) % 12) / 3) || 4; // Adjust for fiscal quarters
  
  return { fiscalYear, fiscalQuarter };
};

const roadmapSortFunc = (a: any, b: any) => {
  const aParsed = parseWhen(a);
  const bParsed = parseWhen(b);

  // Sort by year first, then by quarter
  if (aParsed.year !== bParsed.year) {
    return aParsed.year - bParsed.year;
  }
  
  return aParsed.quarter - bParsed.quarter;
}

const roadmapFilterFunc = (when: any) => {
  if (when === 'TBD') return true; // Always include TBD
  
  const { year, quarter } = parseWhen(when);      
  
  return (
    year > fiscalYear || (year === fiscalYear && quarter >= fiscalQuarter)
  );
}

const { fiscalYear, fiscalQuarter } = getCurrentFiscalQuarter();

export const roadmapList = (data: any, history: boolean) => { 
  const allWhenValues = data.flatMap((obj: any) =>
    obj.roadmap.map((item:RoadmapItem) => item.when)
  );

  const roadMapWhenList = [...new Set(allWhenValues)].sort(roadmapSortFunc);

  if (history) {
    return roadMapWhenList;
  }

  // Filter out older events    
  return roadMapWhenList.filter(roadmapFilterFunc);      
};

export const ServiceRoadmap: React.FC<Props> = (props) => {

  if (!props.roadmapMode || props.roadmapItems.length < 1) {      
    return null;
  }

  const when = props.roadmapMode == 'list'? "" : props.roadmapMode;
  if (when !== "") {
    return props.roadmapItems
      .filter((item) => item.when === when)
      .map((item) => (
        <>
          <strong>{when}:</strong> {item?.title} 
        </> 
      ))
  }
  
  const hideOldRecords = !props.showHistory;
  const roadmapItems = props.roadmapItems
  .sort((a: any, b: any) => roadmapSortFunc(a.when, b.when));
  const filterOldRecords = (roadmap: RoadmapItem[]) => roadmap.filter((item) => roadmapFilterFunc(item.when)); 

  return (
    <div> 
      {props.condensed? "" : <b>Roadmap: </b>}
          <ul>
            {(hideOldRecords ? filterOldRecords(roadmapItems) : roadmapItems)
              .map((roadmapItem, index) => (
                <li key={index}>
                  <strong>{roadmapItem.when}:</strong> {roadmapItem.title}
                </li>
              ))}
          </ul>
    </div>
  );
};
  
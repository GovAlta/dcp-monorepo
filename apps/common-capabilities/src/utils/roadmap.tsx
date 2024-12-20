import React from 'react';
//import './styles.css';

const parseWhen = (when:string) => {
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
const { fiscalYear, fiscalQuarter } = getCurrentFiscalQuarter();

interface RoadmapItem { when: string; title: string; }  
interface Props {roadmapItems: RoadmapItem[]; roadmapMode?:string; showHistory?:boolean; }

export const ServiceRoadmap: React.FC<Props> = (props) => {

    if (props.roadmapMode == undefined || props.roadmapItems.length < 1) {      
      return null;
    }
  
    const when = props.roadmapMode == 'list'? "": props.roadmapMode;
    if (when !=="") {
      const rMap = props.roadmapItems.find((item) => item.when === when);
      return (
        <>
        <strong>{when}:</strong> {rMap?.title} 
      </> )
      }
    
      const hideOldRecords = !props.showHistory;
      const roadmapItems = props.roadmapItems
      .sort((a:any, b:any) => { 
        const aParsed = parseWhen(a.when);
        const bParsed = parseWhen(b.when);
    
        // Sort by year first, then by quarter
        if (aParsed.year !== bParsed.year) {
          return aParsed.year - bParsed.year;
        }
        return aParsed.quarter - bParsed.quarter;
      });
       
      const filterOldRecords = (roadmap: RoadmapItem[]) => {
        return roadmap.filter((item) => {
          if (item.when === "TBD") return true;        
          const { year, quarter } = parseWhen(item.when);      
          return ( year > fiscalYear || (year === fiscalYear && quarter >= fiscalQuarter));        
        });
      }; 
    
      return (
        <div> 
          <b>Roadmap: </b>
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
  

export const roadmaplist = (data:any, history:boolean) => { 
  const allWhenValues = data.flatMap((obj:any) =>
    obj.roadmap.map((item:RoadmapItem) => item.when)
  );

  const roadMapWhenList = [...new Set(allWhenValues)]
    .sort((a:any, b:any) => {
      const aParsed = parseWhen(a);
      const bParsed = parseWhen(b);

      // Sort by year first, then by quarter
      if (aParsed.year !== bParsed.year) {
        return aParsed.year - bParsed.year;
      }
      return aParsed.quarter - bParsed.quarter;
    });

    if (history === true) {
      return roadMapWhenList;
    }

    // Filter out older events    
    return roadMapWhenList.filter((when:any) => {
      if (when === 'TBD') return true; // Always include TBD
      const { year, quarter } = parseWhen(when);      
      return (
        year > fiscalYear || (year === fiscalYear && quarter >= fiscalQuarter)
      );
    });      
};
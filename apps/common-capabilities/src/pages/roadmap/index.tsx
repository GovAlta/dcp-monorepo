// @ts-nocheck
import React, { useEffect, useState, useMemo } from 'react';
import {
  GoAGrid,
  GoASpacer,
  GoAInput,
  GoAThreeColumnLayout,
  GoACheckbox,
  GoAButton,
  GoAButtonGroup,
  GoADetails,
  GoADivider,
  GoAAccordion,
  GoACallout,
  GoACircularProgress,
} from '@abgov/react-components';
import Card from '../../components/Card';
import './styles.css';
import {
  getAppsFilters,
  generateFilterObject,
  generateFilterCounts,
} from '../utils/serviceListUtils';
import { defaultState, filtersList, filterListCustom } from './config';
import useFetch from '../../hooks/useFetch';
import { getApiUrl } from '../../utils/configs';
import { ServiceListingResponse } from '../../types/types';
import { roadmaplist } from '../../components/Card/ServiceRoadmap'

type Filter = {
  [key: string]: any[];
};

export default function HomePage(): JSX.Element {
  const [roadmapView, setRoadmapView] = useState({ grouped: true, history: false });  
  const [collapseKey2, setCollapseKey2] = useState(0);
  const [roadmapAccordionOpen,setRoadmapAccordionOpen] = useState(false); 
  const [collapseKey, setCollapseKey] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [services, setServices] = useState([]);  
  const [filtersAccordionState, setFiltersAccordionState] = useState({
    environment: false,
    language: false,
    keywords: false,
    provider:false,
    status: false,
    functionalGroup: false,
  });

  const listingUrl = useMemo(() => getApiUrl('/listings/services'), []); 
  const [data, error, isLoading] = useFetch<ServiceListingResponse>(listingUrl);
  const [apps, setApps] = useState([]);
  
  // filters state
  const [appFilters, setFilterList] = useState(
    getAppsFilters(services, filtersList)
  );
  const [checkedFilters, setCheckedFilters] = useState(() => {
    const savedCheckboxState = localStorage.getItem('selectedCheckboxState');
    return savedCheckboxState
      ? JSON.parse(savedCheckboxState)
      : generateFilterObject(apps, filtersList);
  });
  const [selectedFiltersState, setSelectedFiltersState] = useState(() => {
    const savedFiltersState = localStorage.getItem('selectedFiltersState');
    return savedFiltersState
      ? JSON.parse(savedFiltersState)
      : defaultState.selectedFilters;
  });

  // to force re-render UI for filter selection counts = n/a. Replaced by collapseKey
  //const [rerender, setRerender] = useState('');
    
  // searches for items in the services array that match the search and filter
  // however search takes priority over filters
  const findServices = (
    array: any[],
    searchRegExp: RegExp,
    fields: string[],
    filters: Filter
  ) => {
    return array.filter((item: any) => {
      const fieldMatch = fields
        .map((field: string) => searchRegExp.test(item[field]))
        .some(Boolean);

      const filterMatches = Object.entries(filters).every(
        ([filterKey, filterValues]) => {
          if (filterValues.length === 0) {
            return true;
          }

          return filterValues.some((filterValue) => appFilters.indexedItems[filterValue]?.has(item.appId));
        }
      );

      return fieldMatch && filterMatches;
    });
  };

  useEffect(() => {
    if (!isLoading && data) {
      setApps(data.services);
      setFilterList(getAppsFilters(data.services, filtersList));
    }
  }, [data, isLoading]);


  // to update the services list when the search value or filters change
  useEffect(() => {
    const searchValue = localStorage.getItem('searchFilter') ?? searchFilter;
    const searchRegEx = new RegExp(
      `${searchValue.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`,
      'i'
    );
    setSearchFilter(localStorage.getItem('searchFilter') || '');
    setServices(
      findServices(
        apps,
        searchRegEx,
        ['description', 'summary', 'serviceName', 'provider', 'filterText', ...filtersList],
        selectedFiltersState
      )
    );

    let timeoutId: NodeJS.Timeout | null = null;

    if (localStorage.getItem('searchTimestamp')) {
      let searchTimestamp = localStorage.getItem('searchTimestamp');
      let now = new Date().getTime();
      let remainingTime = searchTimestamp
        ? Number(searchTimestamp) - Number(now)
        : 0;

      if (remainingTime <= 0) {
        localStorage.removeItem('searchFilter');
        localStorage.removeItem('searchTimestamp');

        localStorage.removeItem('selectedCheckboxState');
        localStorage.removeItem('selectedFiltersState');
      } else {
        timeoutId = setTimeout(() => {
          localStorage.removeItem('searchFilter');
          localStorage.removeItem('searchTimestamp');

          localStorage.removeItem('selectedCheckboxState');
          localStorage.removeItem('selectedFiltersState');
        }, remainingTime);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchFilter, selectedFiltersState, apps]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category && apps?.length > 0) {
      localStorage.removeItem('searchFilter');
      localStorage.removeItem('searchTimestamp');

      localStorage.removeItem('selectedCheckboxState');
      localStorage.removeItem('selectedFiltersState');

      // set the state of selectedCheckboxState and selectedFiltersState of category in the functional group
      setSelectedFiltersState({
        ...defaultState.selectedFilters,
        functionalGroup: [
          category,
          ...defaultState.selectedFilters.functionalGroup,
        ],
      });
      setCheckedFilters({
        ...generateFilterObject(apps, filtersList),
        functionalGroup: {
          ...generateFilterObject(apps, filtersList).functionalGroup,
          [category]: true,
        },
      });
      setFiltersAccordionState({
        ...filtersAccordionState,
        functionalGroup: true,
      });
    }
  }, [apps]);

  const recommendedServices = services;
  const otherServices = []
  
  const roadmapWhenList = roadmaplist(services,roadmapView.history); 
  const roadmapData = (services, targetWhen) => {
    return services.filter(service =>
      service.roadmap.some(roadmapItem => roadmapItem.when === targetWhen)
    );
  };
  const checkedProviders = checkedFilters.provider === undefined ? []
  : Object.entries(checkedFilters.provider).filter(([key, value]) => value);

  return isLoading || !data ? (
    <GoACircularProgress variant="fullscreen" size="large" message="Loading service list..." visible={true} />
  ) : (
    <GoAThreeColumnLayout
      leftColumnWidth="23%"
      maxContentWidth="1550px"
      nav={
        <div className="home-sidebar no-print">
          <h3>Roadmap view:</h3>
    
          <GoACheckbox id={'roadmapGrouped'} checked={roadmapView.grouped} text="Timeline by quarter"
           description={ roadmapView.grouped ? 
             <span>Only showing roadmap items grouped by quarter.</span>
            :<span>Provides an overview showing all sevices and exposes any roadmap items. Tip: Works great with Provider filter</span> }
           onChange={ (name: string, checked: boolean, value: string) =>                   
            setRoadmapView((prevState) => ({ ...prevState, grouped: checked })) }
          />
          <GoACheckbox id={'roadmapHistory'} checked={roadmapView.history} name="history" text="Show past items"
              onChange={ (name: string, checked: boolean, value: string) =>                   
                  setRoadmapView((prevState) => ({ ...prevState, history: checked })) }
           />

          <GoASpacer vSpacing="l" />
          <GoADivider></GoADivider>
          <GoASpacer vSpacing="l" />

          <div id="search-label"> Search</div>
          <GoAInput
            placeholder="Search"
            width="100%"
            name="search"
            leadingIcon="search"
            value={searchFilter}
            onChange={(name: string, value: string) => {
              setSearchFilter(value);
              //reset filters and checkbox state
              localStorage.removeItem('selectedCheckboxState');
              localStorage.removeItem('selectedFiltersState');
              setCheckedFilters(generateFilterObject(apps, filtersList));
              setSelectedFiltersState(defaultState.selectedFilters);
              localStorage.setItem(
                'searchTimestamp',
                (new Date().getTime() + 5 * 60 * 1000).toString()
              );
              localStorage.setItem('searchFilter', value);
            }}
          />
          <GoASpacer vSpacing="l" />
          <GoAButtonGroup alignment="start" gap="compact">
            <GoAButton
              type="primary"
              size="compact"
              onClick={() => {
                localStorage.removeItem('searchFilter');
                localStorage.removeItem('searchTimestamp');
                localStorage.removeItem('selectedCheckboxState');
                localStorage.removeItem('selectedFiltersState');

                setSearchFilter('');
                setCheckedFilters(generateFilterObject(apps, filtersList));
                setSelectedFiltersState(defaultState.selectedFilters);
              }}
            >
              Clear all
            </GoAButton>
            <GoAButton
              size="compact"
              type="secondary"
              onClick={() => {
                setFiltersAccordionState({
                  environment: false,
                  language: false,
                  keywords: false,
                  provider:false,
                  status: false,
                  functionalGroup: false,
                });
                setCollapseKey((prevKey) => prevKey + 1); //
              }}
            >
              Collapse all
            </GoAButton>

            <GoAButton
              size="compact"
              type="secondary"
              onClick={() => {
                setFiltersAccordionState({
                  environment: true,
                  language: true,
                  keywords: true,
                  provider:true,
                  status: true,
                  functionalGroup: true,
                });
              }}
            >
              Expand all            
            </GoAButton>

          </GoAButtonGroup>
          <GoASpacer vSpacing="xl" />
          <GoADivider></GoADivider>
          <GoASpacer vSpacing="xl" />
          {filterListCustom.map((filterCategory) => (
            <div key={filterCategory.property}>
              <GoAAccordion
                key={`${filterCategory.title} ${collapseKey}`}
                headingSize="small"                
                heading={`${filterCategory.title} (${selectedFiltersState[filterCategory.property].length}) `}          
                open={filtersAccordionState[filterCategory.property]}
                onChange={() => (window.location.href = '/addservice/index.html')}
              >
                {appFilters.filters[filterCategory.property]?.map((filter) => (
                  <GoACheckbox
                    key={filter}
                    label={filter}
                    name={filter}
                    text={`${filter}`}
                    checked={checkedFilters[filterCategory.property]?.[filter]}
                    onChange={(name, checked) => {
                      // handles checkboxes checked state
                      setCheckedFilters((prevFilters) => {
                        const newCheckboxState = {
                          ...prevFilters,
                          [filterCategory.property]: {
                            ...prevFilters[filterCategory.property],
                            [name]: checked,
                          },
                        };
                        localStorage.setItem(
                          'selectedCheckboxState',
                          JSON.stringify(newCheckboxState)
                        );
                        return newCheckboxState;
                      });

                      // handles what filters are selected
                      setSelectedFiltersState((prevSelectedFiltersState) => {
                        // if the filter checked is true, add it to the selectedFiltersState or vice versa
                        const newSelectedFiltersState = {
                          ...prevSelectedFiltersState,
                          [filterCategory.property]: checked
                            ? [
                                ...prevSelectedFiltersState[
                                  filterCategory.property
                                ],
                                name,
                              ]
                            : prevSelectedFiltersState[
                                filterCategory.property
                              ].filter((filter) => filter !== name),
                        };
                        localStorage.setItem(
                          'selectedFiltersState',
                          JSON.stringify(newSelectedFiltersState)
                        );
                        return newSelectedFiltersState;
                      });

                      localStorage.setItem(
                        'searchTimestamp',
                        (new Date().getTime() + 5 * 60 * 1000).toString()
                      );
                    }}
                  />
                ))}{' '}
              </GoAAccordion>
              <GoASpacer vSpacing="m" />
            </div>
          ))}
        </div>
      }
    >
      <div className="home-header">
        <h1 id="home-title">Service Roadmaps</h1>        
        <GoAButton type="secondary" onClick={() => (window.location.href = '/addservice/index.html')}>
          <b>Add a new service</b> </GoAButton>        
      </div>
      {checkedProviders.map((item) => (
        <li key={item}>{item}</li>
      ))}

      {roadmapView.grouped ?
      (<>
        <GoASpacer vSpacing="xl" />
        <div className='no-print'>
        <GoAButtonGroup alignment="start" gap="compact">

        <GoAButton size="compact" type="secondary"
          onClick={() => {        
            setRoadmapAccordionOpen(true);    
            setCollapseKey2((prevKey) => prevKey + 1);
            }}
         >Expand all</GoAButton>
        
        <GoAButton size="compact" type="secondary"        
          onClick={() => {        
            setRoadmapAccordionOpen(false);     
            setCollapseKey2((prevKey) => prevKey + 1);
            }}        
        >Collapse all</GoAButton>
      
        </GoAButtonGroup>
        </div>
        <GoASpacer vSpacing="s" />
        {roadmapWhenList.length > 0 ?
        roadmapWhenList.map((when, index) => (          
          <GoAAccordion 
            key={`roadmapAcc${index}-${collapseKey2}`}
            heading={`${when}`} 
            headingSize="small"        
            open={roadmapAccordionOpen}
          >
              <GoAGrid minChildWidth="33ch" gap="xl">
                {roadmapData(services,when).map(app =>             
                  <Card app={app} roadmapMode={when} />
                  )}
              </GoAGrid>
          </GoAAccordion>
          ))
          :
          <GoACallout type="information" size="medium" heading="No roadmap items found based on your search / filter options" />         
        }        
      </>)      
      :
      (<>
        <GoASpacer vSpacing="l" />
        <span className="last-updated">
          Showing {recommendedServices.length + otherServices.length} of{' '} {apps.length} results{' '}
        </span>
        <GoASpacer vSpacing="s" />
        <GoAGrid minChildWidth="35ch" gap="2xl">
          {recommendedServices.length > 0 ? (
            recommendedServices.map((app) => {
              return (
                <Card app={app} roadmapMode={"list"} roadmapHistory={roadmapView.history}               
                />
              );
            })
          ) : (
            <GoACallout
              type="information"
              size="medium"
              heading="No recommended services found based on your search / filter options"
            ></GoACallout>
          )}
        </GoAGrid>
      </>)
      }
    </GoAThreeColumnLayout>
  );
}

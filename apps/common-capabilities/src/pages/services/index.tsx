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
} from '@abgov/react-components-4.20.2';
import Card from '../../components/Card';
import './styles.css';
import {
  getAppsFilters,
  generateFilterObject,
  generateFilterCounts,
} from './utils';
import { defaultState, filtersList, filterListCustom } from './config';
import useFetch from '../../hooks/useFetch';
import { getApiUrl } from '../../utils/configs';
import { ServiceListingResponse } from '../../types/types';

type Filter = {
  [key: string]: any[];
};

export default function HomePage(): JSX.Element {
  const [collapseKey, setCollapseKey] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [services, setServices] = useState([]);
  const [filtersAccordionState, setFiltersAccordionState] = useState({
    Environment: false,
    Language: false,
    Keywords: false,
    Status: false,
    FunctionalGroup: false,
  });
  const listingUrl = useMemo(() => getApiUrl('/listings/services'), []); 
  const [data, error, isLoading] = useFetch<ServiceListingResponse>(listingUrl);
  const [apps, setApps] = useState([]);

  useEffect(() => {
    if (!isLoading && data) {
      setApps(data.services);
    }
  }, [data, isLoading]);
  
  // filters state
  const [filterList, setFilterList] = useState(
    getAppsFilters(services, filtersList)
  );
  const [checkedFilters, setCheckedFilters] = useState(() => {
    const savedCheckboxState = localStorage.getItem('selectedCheckboxState');
    return savedCheckboxState
      ? JSON.parse(savedCheckboxState)
      : generateFilterObject(apps);
  });
  const [selectedFiltersState, setSelectedFiltersState] = useState(() => {
    const savedFiltersState = localStorage.getItem('selectedFiltersState');
    return savedFiltersState
      ? JSON.parse(savedFiltersState)
      : defaultState.selectedFilters;
  });

  // to force re-render UI for filter selection counts
  const [rerender, setRerender] = useState('');

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

          if (Array.isArray(item[filterKey])) {
            return filterValues.some((filterValue) =>
              item[filterKey].includes(filterValue)
            );
          }

          return filterValues.includes(item[filterKey]);
        }
      );

      return fieldMatch && filterMatches;
    });
  };

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
        ['Description', 'Summary', 'ServiceName', 'Provider', 'filterText'],
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

  // to update the filters list when the services list changes
  useEffect(() => {
    setFilterList(getAppsFilters(apps, filtersList));
    setRerender(' ');
  }, [services, apps]);

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
        FunctionalGroup: [
          category,
          ...defaultState.selectedFilters.FunctionalGroup,
        ],
      });
      setCheckedFilters({
        ...generateFilterObject(apps),
        FunctionalGroup: {
          ...generateFilterObject(apps).FunctionalGroup,
          [category]: true,
        },
      });
      setFiltersAccordionState({
        ...filtersAccordionState,
        FunctionalGroup: true,
      });
    }
  }, [apps]);

  const recommendedServices = services.filter((item: any) => item.Recommended )
  const otherServices = services.filter((item: any) => !item.Recommended )  

  return isLoading || !data ? (
    <GoACircularProgress variant="fullscreen" size="large" message="Loading service list..." visible={true} />
  ) : (
    <GoAThreeColumnLayout
      leftColumnWidth="23%"
      maxContentWidth='1550px'
      nav={
        <div className="home-sidebar">
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
              setCheckedFilters(generateFilterObject(apps));
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
                setCheckedFilters(generateFilterObject(apps));
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
                  Environment: false,
                  Language: false,
                  Keywords: false,
                  Status: false,
                  FunctionalGroup: false,
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
                  Environment: true,
                  Language: true,
                  Keywords: true,
                  Status: true,
                  FunctionalGroup: true,
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
            <div>
              <GoAAccordion
                key={`${filterCategory.title} ${collapseKey}`}
                heading={`${filterCategory.title} (${
                  selectedFiltersState[filterCategory.property].length
                }) ${rerender}`}
                headingSize="small"
                open={filtersAccordionState[filterCategory.property]}
              >
                {filterList[filterCategory.property]?.map((filter) => (
                  <GoACheckbox
                    key={filter}
                    label={filter}
                    name={filter}
                    // text={`${filter} (${
                    //   filtersCount[filterCategory.property][filter]
                    // })`}
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
      <h1 id="home-title">Services</h1>      
      {/* <span className="last-updated">Last updated: {formattedDate}</span>   <br /> */}      
      <span className="last-updated">Showing {recommendedServices.length + otherServices.length} of {apps.length} results </span> 
      <GoASpacer vSpacing="s" />      

      <h2>Recommended services listing</h2>
      Recommended services are standard components built for the product teams to reuse. 
      We highly recommend leveraging these standard services with the "Recommended" tag 
      to streamline your development process, maximize efficiency, and optimize costs.

      <GoASpacer vSpacing="xl" />
      <GoAGrid minChildWidth="35ch" gap='2xl'>     
        {recommendedServices.length > 0
          ? recommendedServices.map((app) => {
              return (
                <Card                  
                  key={app.ServiceName}
                  title={app.ServiceName}
                  provider={app.Provider}
                  description={app.Summary}
                  app={app}
                />
              );
            })
          : <GoACallout type="information" size="medium" heading="No recommended services found based on your search / filter options"></GoACallout>
          }         
      </GoAGrid>

      <GoASpacer vSpacing="l" />

      <h2>Other services</h2>
      Other services include services built to serve specific use cases and might not be suitable to 
      be used by the product teams. We still encourage you to the reach out to the service providers
      to collaborate or share knowledge and best practices if you are building something similar.

      <GoASpacer vSpacing="xl" />

      <GoAGrid minChildWidth="35ch" gap='2xl'>        
        {otherServices.length > 0
          ? otherServices.map((app) => {
              return (
                <Card
                  key={app.ServiceName}
                  title={app.ServiceName}
                  provider={app.Provider}
                  description={app.Summary}
                  app={app}
                />                
              );
            })
          : <GoACallout type="information" size="medium" heading="No other services found based on your search / filter options"></GoACallout>
          }
      </GoAGrid>
    </GoAThreeColumnLayout>
  );
}
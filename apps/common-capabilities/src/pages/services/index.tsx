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
  getLastUpdatedDate,
} from '../utils/serviceListUtils';
import { defaultState, filtersList, filterListCustom } from './config';
import useFetch from '../../hooks/useFetch';
import { getApiUrl } from '../../utils/configs';
import { ServiceListingResponse, Status } from '../../types/types';
import LastUpdated from '../../components/LastUpdated';

type Filter = {
  [key: string]: any[];
};

export default function HomePage(): JSX.Element {
  const [collapseKey, setCollapseKey] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [includeDecommissioned, setIncludeDecommissioned] = useState(() => {
    const savedincludeDecommissioned = localStorage.getItem('includeDecommissioned');
    return savedincludeDecommissioned === 'true';
  });
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

  const getHandleFilterChange = (filterProperty) => (name, checked) => {
    // handles checkboxes checked state
    setCheckedFilters((prevFilters) => {
      const newCheckboxState = {
        ...prevFilters,
        [filterProperty]: {
          ...prevFilters[filterProperty],
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
        [filterProperty]: checked
          ? [
              ...prevSelectedFiltersState[
                filterProperty
              ],
              name,
            ]
          : prevSelectedFiltersState[
            filterProperty
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
  };

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
      const services = data.services.filter((s) => includeDecommissioned || s.status !== Status.Decommissioned);
      setApps(services);
      setLastUpdated(getLastUpdatedDate(services));
      setFilterList(getAppsFilters(services, filtersList));
    }
  }, [data, isLoading, includeDecommissioned]);

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

  const recommendedServices = services.filter((item: any) => item.recommended )
  const otherServices = services.filter((item: any) => !item.recommended )

  return isLoading || !data ? (
    <GoACircularProgress variant="fullscreen" size="large" message="Loading service list..." visible={true} />
  ) : (
    <GoAThreeColumnLayout
      leftColumnWidth="23%"
      maxContentWidth="1550px"
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
          <GoASpacer vSpacing="l" />
          <GoACheckbox
              key={"includeDecommissioned"}
              label={"Include Decommissioned services"}
              name={"includeDecommissioned"}
              text={"Include Decommissioned services"}
              checked={includeDecommissioned}
              onChange={(name, checked) => {
                setIncludeDecommissioned(checked);
                localStorage.setItem('includeDecommissioned', checked);
                if (!checked) {
                  getHandleFilterChange('status')(Status.Decommissioned, false);
                }
              }}
            />
          <GoADivider></GoADivider>
          <GoASpacer vSpacing="xl" />
          {filterListCustom.map((filterCategory) => (
            <div key={filterCategory.property}>
              <GoAAccordion
                key={`${filterCategory.title} ${collapseKey}`}
                heading={`${filterCategory.title} (${
                  selectedFiltersState[filterCategory.property].length
                })`}
                headingSize="small"
                open={filtersAccordionState[filterCategory.property]}
              >
                {appFilters.filters[filterCategory.property]?.map((filter) => (
                  <GoACheckbox
                    key={filter}
                    label={filter}
                    name={filter}
                    text={`${filter}`}
                    checked={checkedFilters[filterCategory.property]?.[filter]}
                    onChange={getHandleFilterChange(filterCategory.property)}
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
        <h1 id="home-title">
          Services
        </h1>
        <GoAButton
          type="secondary"
          onClick={() => (window.location.href = '/addservice/index.html')}
        >
        <b>Add a new service</b>
        </GoAButton>
      </div>
      {/* <span className="last-updated">Last updated: {formattedDate}</span>   <br /> */}
      <span className="last-updated">
        Showing {recommendedServices.length + otherServices.length} of{' '}
        {apps.length} results{' '}
      </span>
      <GoASpacer vSpacing="s" />
      <h2>Recommended services listing</h2>
      Recommended services are standard components built for the product teams
      to reuse. We highly recommend leveraging these standard services with the
      "Recommended" tag to streamline your development process, maximize
      efficiency, and optimize costs.
      <GoASpacer vSpacing="xl" />
      <GoAGrid minChildWidth="35ch" gap="2xl">
        {recommendedServices.length > 0 ? (
          recommendedServices.map((app) => {
            return (
              <Card
                key={app.appId}
                title={app.serviceName}
                provider={app.provider}
                description={app.summary}
                app={app}
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
      <GoASpacer vSpacing="l" />
      <h2>Other services</h2>
      Other services include services built to serve specific use cases and
      might not be suitable to be used by the product teams. We still encourage
      you to the reach out to the service providers to collaborate or share
      knowledge and best practices if you are building something similar.
      <GoASpacer vSpacing="xl" />
      <GoAGrid minChildWidth="35ch" gap="2xl">
        {otherServices.length > 0 ? (
          otherServices.map((app) => {
            return (
              <Card
                key={app.appId}
                title={app.serviceName}
                provider={app.provider}
                description={app.summary}
                app={app}
              />
            );
          })
        ) : (
          <GoACallout
            type="information"
            size="medium"
            heading="No other services found based on your search / filter options"
          ></GoACallout>
        )}
      </GoAGrid>
      <GoASpacer vSpacing="3xl" />
      <LastUpdated date={lastUpdated} />
    </GoAThreeColumnLayout>
  );
}

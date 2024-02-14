// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { lastUpdated, services as apps } from '../../content/datastore.json';
import {
  GoAGrid,
  GoASpacer,
  GoAInput,
  GoAThreeColumnLayout,
  GoACheckbox,
  GoAAccordion,
  GoAButton,
  GoAButtonGroup,
  GoADivider
} from '@abgov/react-components';
import Card from '../../components/Card';
import './styles.css';
import { extractAvailableFilters } from './utils';
import { defaultState, filtersList } from './config';

type Filter = {
  [key: string]: any[];
};

export default function HomePage(): JSX.Element {
  const [collapseKey, setCollapseKey] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [services, setServices] = useState([]);
  const [filtersAccordionState, setFiltersAccordionState] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState(() => {
    const savedFilters = localStorage.getItem('selectedFilters');
    return savedFilters
      ? JSON.parse(savedFilters)
      : defaultState.selectedFilters;
  });
  const date = new Date(lastUpdated);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // grab all the available filters from the services
  const [filters, setFilters] = useState(extractAvailableFilters(services));

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
            return filterValues.every((filterValue) =>
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
        ['Description', 'Summary', 'ServiceName', 'Provider'],
        selectedFilters
      )
    );

    let timeoutId: NodeJS.Timeout | null = null;

    if (localStorage.getItem('searchFilter')) {
      let searchTimestamp = localStorage.getItem('searchTimestamp');
      let now = new Date().getTime();
      let remainingTime = searchTimestamp
        ? Number(searchTimestamp) - Number(now)
        : 0;

      if (remainingTime <= 0) {
        localStorage.removeItem('searchFilter');
        localStorage.removeItem('searchTimestamp');
        localStorage.removeItem('selectedFilters');
      } else {
        timeoutId = setTimeout(() => {
          localStorage.removeItem('searchFilter');
          localStorage.removeItem('searchTimestamp');
          localStorage.removeItem('selectedFilters');
        }, remainingTime);
      }
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [searchFilter, selectedFilters]);

  // to update the filters list when the services list changes
  useEffect(() => {
    setFilters(extractAvailableFilters(services));
  }, [services]);

  return (
    <GoAThreeColumnLayout
      leftColumnWidth="24%"
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
              localStorage.removeItem('selectedFilters');
              setSelectedFilters(defaultState.selectedFilters);
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
                localStorage.removeItem('selectedFilters');
                setSearchFilter('');
                setSelectedFilters(defaultState.selectedFilters);
              }}
            >
              Clear all
            </GoAButton>
            <GoAButton
              size="compact"
              type="secondary"
              onClick={() => {
                setFiltersAccordionState(false);
                setCollapseKey((prevKey) => prevKey + 1); //
              }}
            >
              Collapse all
            </GoAButton>
            <GoAButton
              size="compact"
              type="secondary"
              onClick={() => {
                setFiltersAccordionState(true);
              }}
            >
              Expand all
            </GoAButton>
          </GoAButtonGroup>
          <GoASpacer vSpacing="xl" />
          <GoADivider></GoADivider>
          <GoASpacer vSpacing="xl" />
          {filtersList.map((filterCategory) => (
            <div>
              <GoAAccordion
                key={`${filterCategory} ${collapseKey}`}
                heading={`${filterCategory} (${filters[filterCategory].filters.length})`}
                headingSize="small"
                open={filtersAccordionState}
              >
                {filters[filterCategory].filters.map((env) => (
                  <GoACheckbox
                    key={env.value}
                    label={env.value}
                    name={env.value}
                    text={`${env.value} (${env.count})`}
                    checked={selectedFilters[filterCategory].includes(
                      env.value
                    )}
                    onChange={(name, checked) => {
                      setSelectedFilters((prevFilters) => {
                        const newFilters = {
                          ...prevFilters,
                          [filterCategory]: checked
                            ? [...prevFilters[filterCategory], name]
                            : prevFilters[filterCategory].filter(
                                (item) => item !== name
                              ),
                        };
                        localStorage.setItem(
                          'selectedFilters',
                          JSON.stringify(newFilters)
                        );
                        localStorage.setItem(
                          'searchTimestamp',
                          (new Date().getTime() + 5 * 60 * 1000).toString()
                        );
                        return newFilters;
                      });
                    }}
                  />
                ))}
              </GoAAccordion>
              <GoASpacer vSpacing="m" />
            </div>
          ))}
        </div>
      }
    >
      <h2 id="home-title">Overview</h2>
      <span className="last-updated">Last updated: {formattedDate}</span>
      <GoASpacer vSpacing="s" />

      <p className="cc-intro">
        Common capabilities encompass a broad spectrum of software components
        and systems ( including applications, APIs, frameworks, libraries,
        tools, services and various other types). These are like building blocks
        that can be used on their own or together to improve and simplify
        processes. These components are known for being reusable, able to make
        operations more efficient, in line with the organization's goals, and
        compatible with existing systems. We provide here a listing of common
        capabilities to explore. For specific inquiries, we recommend reaching
        out to the respective teams who are owners for capabilities. Refer to{' '}
        <a href="/contact/index.html#faq-section">FAQ</a> page for more details.
      </p>

      <GoASpacer vSpacing="xl" />

      <h3>Services listing</h3>

      <GoAGrid minChildWidth="35ch">
        {/* <div className="tile-wrapper"> */}
        {services.length >= 1
          ? services.map((app) => (
              <Card
                key={app.ServiceName}
                title={app.ServiceName}
                provider={app.Provider}
                description={app.Summary}
                app={app}
              />
            ))
          : 'No results found'}
        {/* </div> */}
      </GoAGrid>
    </GoAThreeColumnLayout>
  );
}

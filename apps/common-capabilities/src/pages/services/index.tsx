// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { lastUpdated, services as apps } from '../../content/datastore.json';
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
} from '@abgov/react-components-4.20.2';
import Card from '../../components/Card';
import './styles.css';
import {
  getAppsFilters,
  generateFilterObject,
  generateFilterCounts,
} from './utils';
import { defaultState, filtersList, filterListCustom } from './config';

type Filter = {
  [key: string]: any[];
};

export default function HomePage(): JSX.Element {
  const [collapseKey, setCollapseKey] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [services, setServices] = useState([]);
  const [filtersAccordionState, setFiltersAccordionState] = useState(false);
  const date = new Date(lastUpdated);
  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const recommendedServicesWeightage = 50;

  // filters state
  const [filterList, setFilterList] = useState(
    getAppsFilters(services, filtersList)
  );
  const [checkedFilters, setCheckedFilters] = useState(() => {
    const savedCheckboxState = localStorage.getItem('selectedCheckboxState');
    return savedCheckboxState
      ? JSON.parse(savedCheckboxState)
      : generateFilterObject();
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
  }, [searchFilter, selectedFiltersState]);

  // to update the filters list when the services list changes
  useEffect(() => {
    setFilterList(getAppsFilters(apps, filtersList));
    setRerender(' ');
  }, [services]);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get('category');

    if (category) {
      console.log(`Category from URL: ${category}`);
      // set the state of selectedCheckboxState and selectedFiltersState of category in the functional group
      setSelectedFiltersState({
        ...selectedFiltersState,
        FunctionalGroup: [category, ...selectedFiltersState.FunctionalGroup],
      });
      setCheckedFilters({
        ...checkedFilters,
        FunctionalGroup: {
          ...checkedFilters.FunctionalGroup,
          [category]: true,
        },
      });
    }
  }, []);

  return (
    <GoAThreeColumnLayout
      leftColumnWidth="23%"
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
              setCheckedFilters(generateFilterObject());
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
                setCheckedFilters(generateFilterObject());
                setSelectedFiltersState(defaultState.selectedFilters);
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
          {filterListCustom.map((filterCategory) => (
            <div>
              <GoAAccordion
                key={`${filterCategory.title} ${collapseKey}`}
                heading={`${filterCategory.title} (${
                  selectedFiltersState[filterCategory.property].length
                }) ${rerender}`}
                headingSize="small"
                open={filtersAccordionState}
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
                    checked={checkedFilters[filterCategory.property][filter]}
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
      <h2 id="home-title">Services</h2>
      <span className="last-updated">Last updated: {formattedDate}</span>
      <GoASpacer vSpacing="xs" />

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
      <GoASpacer vSpacing="2xl" />

      <GoADetails heading="Recommended capabilities">
        <ul>
          <li>
            Why use them? To maximize efficiency and optimize costs by
            leveraging standardized capabilities to streamline your development
            process.
          </li>
          <li>
            Encounter unique scenarios? Share feedback with the respective team
            - a catalyst for improvement
          </li>
        </ul>
      </GoADetails>
      <GoASpacer vSpacing="2xl" />

      <h3>Recommended services listing</h3>

      <GoASpacer vSpacing="m" />
      <GoAGrid minChildWidth="35ch">
        {/* <div className="tile-wrapper"> */}
        {services.length >= 1
          ? services.map((app) => {
              return app.InternalWeightage >= recommendedServicesWeightage ? (
                <Card
                  key={app.ServiceName}
                  title={app.ServiceName}
                  provider={app.Provider}
                  description={app.Summary}
                  app={app}
                />
              ) : (
                ''
              );
            })
          : 'No results found'}
        {/* </div> */}
      </GoAGrid>

      <GoASpacer vSpacing="2xl" />

      <h3>Services listing</h3>

      <GoASpacer vSpacing="m" />

      <GoAGrid minChildWidth="35ch">
        {/* <div className="tile-wrapper"> */}
        {services.length >= 1
          ? services.map((app) => {
              return app.InternalWeightage < recommendedServicesWeightage ? (
                <Card
                  key={app.ServiceName}
                  title={app.ServiceName}
                  provider={app.Provider}
                  description={app.Summary}
                  app={app}
                />
              ) : (
                ''
              );
            })
          : 'No results found'}
        {/* </div> */}
      </GoAGrid>
    </GoAThreeColumnLayout>
  );
}

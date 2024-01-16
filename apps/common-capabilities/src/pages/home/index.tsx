// @ts-nocheck
import React, { useEffect, useState } from 'react';
import apps from '../../content/datastore.json';
import {
  GoAOneColumnLayout,
  GoAGrid,
  GoASpacer,
  GoAInput,
  GoAThreeColumnLayout,
  GoACheckbox,
} from '@abgov/react-components';
import Card from '../../components/Card';
import './styles.css';
import { extractAvailableFilters, capitalizeFirstWord } from './utils';

export default function HomePage(): JSX.Element {
  const [searchFilter, setSearchFilter] = useState('');
  const [services, setServices] = useState([]);
  // const [selectedFilters, setSelectedFilters] = useState({
  //   Environment: [],
  //   Languages: [],
  //   Keywords: [],
  //   Status: [],
  // });
  const [selectedFilters, setSelectedFilters] = useState(() => {
    const savedFilters = localStorage.getItem('selectedFilters');
    return savedFilters
      ? JSON.parse(savedFilters)
      : {
          Environment: [],
          Languages: [],
          Keywords: [],
          Status: [],
        };
  });
  // grab all the available filters from the services
  const [filters, setFilters] = useState(extractAvailableFilters(services));

  // filters to show in the side nav
  const filtersList = ['Environment', 'Languages', 'Keywords', 'Status'];
  const passInput = (input: any) => input;

  // searches for items in the services array that match the search and filter
  // however search takes priority over filters
  const findServices = (
    array: any,
    searchRegExp: any,
    fields: any,
    environmentFilter?: any,
    languageFilter?: any,
    keywordsFilter?: any,
    statusFilter?: any
  ) => {
    return array.filter((item: any) => {
      // returns true if at least one of fields value match to regexp
      const fieldMatch = fields
        .map((field: any) => searchRegExp.test(item[field]))
        .some(passInput);

      const environmentMatch =
        searchFilter !== '' ||
        environmentFilter.length === 0 ||
        environmentFilter.every((env) => item.Environment.includes(env));

      const languageMatch =
        searchFilter !== '' ||
        languageFilter.length === 0 ||
        languageFilter.every((lang) => item.Language.includes(lang));

      const keywordsMatch =
        searchFilter !== '' ||
        keywordsFilter.length === 0 ||
        keywordsFilter.every((keyword) => item.Keywords.includes(keyword));

      const statusMatch =
        statusFilter.length === 0 || statusFilter.includes(item.Status);

      return (
        fieldMatch &&
        environmentMatch &&
        languageMatch &&
        keywordsMatch &&
        statusMatch
      );
    });
  };

  // console.log(filters);

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
        ['Description', 'ServiceName', 'Provider'],
        selectedFilters.Environment,
        selectedFilters.Languages,
        selectedFilters.Keywords,
        selectedFilters.Status
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
      nav={
        <div className="home-sidebar">
          <div id="search-label"> Search</div>
          <GoAInput
            placeholder="Search"
            // width="50%"
            name="search"
            leadingIcon="search"
            value={searchFilter}
            onChange={(name: string, value: string) => {
              setSearchFilter(value);
              localStorage.removeItem('selectedFilters');
              setSelectedFilters({
                Environment: [],
                Languages: [],
                Keywords: [],
                Status: [],
              });
              localStorage.setItem(
                'searchTimestamp',
                (new Date().getTime() + 5 * 60 * 1000).toString()
              );
              localStorage.setItem('searchFilter', value);
            }}
          />
          <GoASpacer vSpacing="m" />
          <div
            className="link-button"
            onClick={() => {
              localStorage.removeItem('searchFilter');
              localStorage.removeItem('searchTimestamp');
              localStorage.removeItem('selectedFilters');
              setSearchFilter('');
              setSelectedFilters({
                Environment: [],
                Languages: [],
                Keywords: [],
                Status: [],
              });
            }}
          >
            Clear all
          </div>
          <GoASpacer vSpacing="l" />
          {filtersList.map((filterCategory) => (
            <div key={filterCategory}>
              <div id="filter-label">{`${filterCategory} (${filters[filterCategory].filters.length})`}</div>
              <GoASpacer vSpacing="m" />
              {filters[filterCategory].filters.map((env) => (
                <GoACheckbox
                  key={env.value}
                  label={env.value}
                  name={env.value}
                  text={`${capitalizeFirstWord(env.value.toLowerCase())} (${
                    env.count
                  })`}
                  checked={selectedFilters[filterCategory].includes(env.value)}
                  onChange={(name, checked, value) => {
                    // setSelectedFilters({
                    //   ...selectedFilters,
                    //   [filterCategory]: checked
                    //     ? [...selectedFilters[filterCategory], name]
                    //     : selectedFilters[filterCategory].filter(
                    //         (item) => item !== name
                    //       ),
                    // });
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
            </div>
          ))}
        </div>
      }
    >
      <h2 id="home-title">Overview</h2>
      <span className="last-updated">Last updated: December 08, 2023</span>
      <GoASpacer vSpacing="s" />

      <p className="cc-intro">
        Common capabilities encompass a broad spectrum of software components
        and systems ( including applications, APIs, frameworks, libraries,
        tools, services and various other types). These are like building blocks
        that can be used on their own or together to improve and simplify
        processes. These components are known for being reusable, able to make
        operations more efficient, in line with the organization's goals, and
        compatible with existing systems. We provide here a listing of common
        capabilities to explore.
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
                description={app.Description}
                app={app}
              />
            ))
          : 'No results found'}
        {/* </div> */}
      </GoAGrid>
    </GoAThreeColumnLayout>
  );
}

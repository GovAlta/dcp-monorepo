import React, { useEffect, useState, useMemo } from 'react';
import {
  GoabGrid,
  GoabSpacer,
  GoabInput,
  GoabThreeColumnLayout,
  GoabCheckbox,
  GoabButton,
  GoabButtonGroup,
  GoabDivider,
  GoabAccordion,
  GoabCallout,
  GoabCircularProgress,
  GoabNotification,
} from '@abgov/react-components';
import Card from '../../components/Card';
import './styles.css';
import {
  getAppsFilters,
  generateFilterObject,
  getLastUpdatedDate,
} from '../utils/serviceListUtils';
import {
  defaultSelectedFilters,
  filtersList,
  filterListCustom,
} from '../common/listview/configs';
import useFetch from '../../hooks/useFetch';
import { getApiUrl } from '../../utils/configs';
import {
  Service,
  ServiceAttribute,
  ServiceListingResponse,
  Status,
} from '../../types/types';
import { roadmapList } from '../../components/Card/ServiceRoadmap';
import LastUpdated from '../../components/LastUpdated';
import axios from 'axios';
import { useAuth } from '../../providers/AuthStateProvider';
import {
  FilterableField,
  FilterCheckboxState,
  FilterState,
} from '../types/types';

type ExportAPIState = {
  loading: boolean;
  error: string | null;
};

export default function HomePage(): JSX.Element {
  const [roadmapView, setRoadmapView] = useState({
    grouped: true,
    history: false,
    condensed: true,
  });
  const [collapseKey2, setCollapseKey2] = useState(0);
  const [roadmapAccordionOpen, setRoadmapAccordionOpen] = useState(false);
  const [collapseKey, setCollapseKey] = useState(0);
  const [searchFilter, setSearchFilter] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [includeDecommissioned, setIncludeDecommissioned] = useState(() => {
    const persistedValue = localStorage.getItem('includeDecommissioned');
    return persistedValue === 'true';
  });
  const [services, setServices] = useState<Service[]>([]);
  const [filtersAccordionState, setFiltersAccordionState] = useState({
    environment: false,
    language: false,
    keywords: false,
    provider: false,
    status: false,
    functionalGroup: false,
  });

  const exportRoadmapUrl = useMemo(
    () => getApiUrl('/listings/services/roadmap/export'),
    [],
  );
  const [exportApi, setExportApiState] = useState<ExportAPIState>({
    loading: false,
    error: null,
  });

  const { authToken } = useAuth();
  const listingUrl = useMemo(() => getApiUrl('/listings/services'), []);
  const [data, error, isLoading] = useFetch<ServiceListingResponse>(
    listingUrl,
    { headers: { Authorization: `Bearer ${authToken}` } },
  );
  const [apps, setApps] = useState<Service[]>([]);

  // filters state
  const [appFilters, setFilterList] = useState(
    getAppsFilters(services, filtersList),
  );
  const [checkedFilters, setCheckedFilters] = useState<FilterCheckboxState>(
    () => {
      const savedCheckboxState = localStorage.getItem('selectedCheckboxState');
      return savedCheckboxState
        ? JSON.parse(savedCheckboxState)
        : generateFilterObject(apps, filtersList);
    },
  );
  const [selectedFiltersState, setSelectedFiltersState] = useState<FilterState>(
    () => {
      const savedFiltersState = localStorage.getItem('selectedFiltersState');
      return savedFiltersState
        ? JSON.parse(savedFiltersState)
        : defaultSelectedFilters;
    },
  );

  const getHandleFilterChange =
    (filterProperty: FilterableField) =>
    ({ name, checked }: { name?: string; checked: boolean }) => {
      if (!name) return;
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
          JSON.stringify(newCheckboxState),
        );
        return newCheckboxState;
      });

      // handles what filters are selected
      setSelectedFiltersState((prevSelectedFiltersState) => {
        // if the filter checked is true, add it to the selectedFiltersState or vice versa
        const newSelectedFiltersState = {
          ...prevSelectedFiltersState,
          [filterProperty]: checked
            ? [...prevSelectedFiltersState[filterProperty], name]
            : prevSelectedFiltersState[filterProperty].filter(
                (filter) => filter !== name,
              ),
        };
        localStorage.setItem(
          'selectedFiltersState',
          JSON.stringify(newSelectedFiltersState),
        );
        return newSelectedFiltersState;
      });

      localStorage.setItem(
        'searchTimestamp',
        (new Date().getTime() + 5 * 60 * 1000).toString(),
      );
    };

  // to force re-render UI for filter selection counts = n/a. Replaced by collapseKey
  //const [rerender, setRerender] = useState('');

  // searches for items in the services array that match the search and filter
  // however search takes priority over filters
  const findServices = (
    array: Service[],
    searchRegExp: RegExp,
    fields: ServiceAttribute[],
    filters: FilterState,
  ) => {
    return array.filter((item) => {
      const fieldMatch = fields
        .map((field) => searchRegExp.test(item[field] as string))
        .some(Boolean);

      const filterMatches = Object.entries(filters).every(
        ([, filterValues]) => {
          if (filterValues.length === 0) {
            return true;
          }

          return filterValues.some((filterValue) =>
            appFilters.indexedItems[filterValue]?.has(item.appId),
          );
        },
      );

      return fieldMatch && filterMatches;
    });
  };

  const downloadRoadmap = async () => {
    setExportApiState({ loading: true, error: null });

    try {
      const response = await axios.get(exportRoadmapUrl, {
        responseType: 'blob',
        headers: { Authorization: `Bearer ${authToken}` },
      });

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const a = document.createElement('a');
      a.href = url;
      const date = new Date();
      const year = date.getFullYear();
      const month = `0${date.getMonth() + 1}`.slice(-2);
      const day = `0${date.getDate()}`.slice(-2);
      const hours = `0${date.getHours() % 12 || 12}`.slice(-2);
      const minutes = `0${date.getMinutes()}`.slice(-2);
      const ampm = date.getHours() >= 12 ? ' PM' : ' AM';
      const timestamp = `${year}-${month}-${day} ${hours}:${minutes}${ampm}`;
      a.download = `Roadmap ${timestamp}.csv`;
      a.click();
      window.URL.revokeObjectURL(url);
      setExportApiState({ loading: false, error: null });
    } catch (error) {
      console.error(error);
      setExportApiState({ loading: false, error: (error as Error).message });
    }
  };

  useEffect(() => {
    if (!isLoading && data) {
      const services = data.services.filter(
        (s) => includeDecommissioned || s.status !== Status.Decommissioned,
      );
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
      'i',
    );
    setSearchFilter(localStorage.getItem('searchFilter') || '');
    setServices(
      findServices(
        apps,
        searchRegEx,
        [
          'description',
          'summary',
          'serviceName',
          'provider',
          'filterText',
          ...filtersList,
        ],
        selectedFiltersState,
      ),
    );

    let timeoutId: NodeJS.Timeout | null = null;

    if (localStorage.getItem('searchTimestamp')) {
      const searchTimestamp = localStorage.getItem('searchTimestamp');
      const now = new Date().getTime();
      const remainingTime = searchTimestamp
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
        ...defaultSelectedFilters,
        functionalGroup: [category, ...defaultSelectedFilters.functionalGroup],
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

  const roadmapWhenList = roadmapList(services, roadmapView.history);
  const roadmapData = (services: Service[], targetWhen: string) => {
    return services.filter((service) =>
      service.roadmap?.some((roadmapItem) => roadmapItem.when === targetWhen),
    );
  };

  let content;

  if (isLoading || (!data && !error)) {
    content = (
      <GoabCircularProgress
        variant="fullscreen"
        size="large"
        message="Loading service list..."
        visible={true}
      />
    );
  } else if (error) {
    content = (
      <GoabNotification type="emergency" ariaLive="assertive">
        Failed to load service details. Please try again later. <br /> Error:{' '}
        {error.message}
      </GoabNotification>
    );
  } else {
    content = (
      <GoabThreeColumnLayout
        leftColumnWidth="23%"
        maxContentWidth="1550px"
        nav={
          <div className="home-sidebar no-print">
            <h3>Roadmap view:</h3>

            <GoabCheckbox
              id={'roadmapGrouped'}
              checked={roadmapView.grouped}
              name={'groupByQuarter'}
              text="Timeline by quarter"
              description={
                roadmapView.grouped ? (
                  <span>Only showing roadmap items grouped by quarter.</span>
                ) : (
                  <span>
                    Provides an overview showing ALL sevices and exposes roadmap
                    items. Intended to be used with the Provider filter.
                  </span>
                )
              }
              onChange={({ checked }) =>
                setRoadmapView((prevState) => ({
                  ...prevState,
                  grouped: checked,
                }))
              }
            />

            <GoabCheckbox
              id={'roadmapCondensed'}
              checked={roadmapView.condensed}
              name="history"
              text="Minimized view"
              onChange={({ checked }) =>
                setRoadmapView((prevState) => ({
                  ...prevState,
                  condensed: checked,
                }))
              }
            />

            <GoabCheckbox
              id={'roadmapHistory'}
              checked={roadmapView.history}
              name="history"
              text="Show past items"
              onChange={({ checked }) =>
                setRoadmapView((prevState) => ({
                  ...prevState,
                  history: checked,
                }))
              }
            />

            <GoabSpacer vSpacing="l" />
            <GoabDivider></GoabDivider>
            <GoabSpacer vSpacing="l" />

            <div id="search-label"> Search</div>
            <GoabInput
              placeholder="Search"
              width="100%"
              name="search"
              leadingIcon="search"
              value={searchFilter}
              onChange={({ value }) => {
                setSearchFilter(value);
                //reset filters and checkbox state
                localStorage.removeItem('selectedCheckboxState');
                localStorage.removeItem('selectedFiltersState');
                setCheckedFilters(generateFilterObject(apps, filtersList));
                setSelectedFiltersState(defaultSelectedFilters);
                localStorage.setItem(
                  'searchTimestamp',
                  (new Date().getTime() + 5 * 60 * 1000).toString(),
                );
                localStorage.setItem('searchFilter', value);
              }}
            />
            <GoabSpacer vSpacing="l" />

            <GoabButtonGroup alignment="start" gap="compact">
              <GoabButton
                type="primary"
                size="compact"
                onClick={() => {
                  localStorage.removeItem('searchFilter');
                  localStorage.removeItem('searchTimestamp');
                  localStorage.removeItem('selectedCheckboxState');
                  localStorage.removeItem('selectedFiltersState');

                  setSearchFilter('');
                  setCheckedFilters(generateFilterObject(apps, filtersList));
                  setSelectedFiltersState(defaultSelectedFilters);
                }}
              >
                Clear all
              </GoabButton>
              <GoabButton
                size="compact"
                type="secondary"
                onClick={() => {
                  setFiltersAccordionState({
                    environment: false,
                    language: false,
                    keywords: false,
                    provider: false,
                    status: false,
                    functionalGroup: false,
                  });
                  setCollapseKey((prevKey) => prevKey + 1); //
                }}
              >
                Collapse all
              </GoabButton>

              <GoabButton
                size="compact"
                type="secondary"
                onClick={() => {
                  setFiltersAccordionState({
                    environment: true,
                    language: true,
                    keywords: true,
                    provider: true,
                    status: true,
                    functionalGroup: true,
                  });
                }}
              >
                Expand all
              </GoabButton>
            </GoabButtonGroup>
            <GoabSpacer vSpacing="xl" />
            <GoabCheckbox
              key={'includeDecommissioned'}
              name={'includeDecommissioned'}
              text={'Include decommissioned services'}
              checked={includeDecommissioned}
              onChange={({ checked }) => {
                setIncludeDecommissioned(checked);
                localStorage.setItem(
                  'includeDecommissioned',
                  checked.toString(),
                );
                if (!checked) {
                  getHandleFilterChange('status')({
                    name: Status.Decommissioned,
                    checked: false,
                  });
                }
              }}
            />
            <GoabDivider />
            <GoabSpacer vSpacing="xl" />
            {filterListCustom.map((filterCategory) => (
              <div key={filterCategory.property}>
                <GoabAccordion
                  key={`${filterCategory.title} ${collapseKey}`}
                  headingSize="small"
                  heading={`${filterCategory.title} (${
                    selectedFiltersState[filterCategory.property].length
                  }) `}
                  open={filtersAccordionState[filterCategory.property]}
                >
                  {appFilters.filters[filterCategory.property]?.map(
                    (filter) => (
                      <GoabCheckbox
                        key={filter}
                        name={filter}
                        text={`${filter}`}
                        checked={
                          checkedFilters[filterCategory.property]?.[filter]
                        }
                        onChange={getHandleFilterChange(
                          filterCategory.property,
                        )}
                      />
                    ),
                  )}{' '}
                </GoabAccordion>
                <GoabSpacer vSpacing="m" />
              </div>
            ))}
          </div>
        }
      >
        <div className="home-header">
          <h1 id="home-title">Service Roadmaps</h1>
        </div>

        {roadmapView.grouped ? (
          <>
            <GoabSpacer vSpacing="xl" />
            <div className="no-print align-buttons-roadmap">
              <GoabButtonGroup alignment="start" gap="compact">
                <GoabButton
                  size="compact"
                  type="secondary"
                  onClick={() => {
                    setRoadmapAccordionOpen(true);
                    setCollapseKey2((prevKey) => prevKey + 1);
                  }}
                >
                  Expand all
                </GoabButton>

                <GoabButton
                  size="compact"
                  type="secondary"
                  onClick={() => {
                    setRoadmapAccordionOpen(false);
                    setCollapseKey2((prevKey) => prevKey + 1);
                  }}
                >
                  Collapse all
                </GoabButton>
              </GoabButtonGroup>
              <GoabButton
                size="compact"
                type="primary"
                leadingIcon="download"
                disabled={exportApi.loading}
                onClick={downloadRoadmap}
              >
                Download roadmap
              </GoabButton>
            </div>
            <GoabSpacer vSpacing="s" />
            {roadmapWhenList.length > 0 ? (
              roadmapWhenList.map((when, index) => (
                <GoabAccordion
                  key={`roadmapAcc${index}-${collapseKey2}`}
                  heading={`${when}`}
                  headingSize="small"
                  open={roadmapAccordionOpen}
                >
                  <GoabGrid minChildWidth="33ch" gap="xl">
                    {roadmapData(services, when).map((app) => (
                      <Card
                        key={`grouped-${app.appId}`}
                        app={app}
                        roadmapMode={when}
                        condensed={roadmapView.condensed}
                      />
                    ))}
                  </GoabGrid>
                </GoabAccordion>
              ))
            ) : (
              <GoabCallout
                type="information"
                size="medium"
                heading="No roadmap items found based on your search / filter options"
              />
            )}
          </>
        ) : (
          <>
            <GoabSpacer vSpacing="l" />
            <span className="last-updated">
              Showing {services.length} of {apps.length} results{' '}
            </span>
            <GoabSpacer vSpacing="s" />
            <GoabGrid minChildWidth="35ch" gap="2xl">
              {services.length > 0 ? (
                services.map((app) => {
                  return (
                    <Card
                      key={`non-grouped-${app.appId}`}
                      app={app}
                      roadmapMode={'list'}
                      roadmapHistory={roadmapView.history}
                      condensed={roadmapView.condensed}
                    />
                  );
                })
              ) : (
                <GoabCallout
                  type="information"
                  size="medium"
                  heading="No roadmap items found based on your search / filter options"
                ></GoabCallout>
              )}
            </GoabGrid>
          </>
        )}
        <GoabSpacer vSpacing="3xl" />
        <LastUpdated date={lastUpdated} />
      </GoabThreeColumnLayout>
    );
  }

  return content;
}

import { filtersList } from './config';

export function capitalizeFirstWord(s) {
  return s.replace(/(^|[^a-zA-Z])[a-z]/g, (match) => match.toUpperCase());
}

export function getAppsFilters(apps, filterKeys) {
  const filters = {};

  apps.forEach((app) => {
    filterKeys.forEach((key) => {
      if (app[key]) {
        if (Array.isArray(app[key])) {
          // If the property is an array, add each element to the filter
          app[key].forEach((element) => {
            if (!filters[key]) {
              filters[key] = new Set();
            }
            filters[key].add(element);
          });
        } else {
          // If the property is not an array, add it directly to the filter
          if (!filters[key]) {
            filters[key] = new Set();
          }
          filters[key].add(app[key]);
        }
      }
    });
  });

  // Convert Set back to array and add 'Other' to each filter
  for (const key in filters) {
    filters[key] = Array.from(filters[key]).sort();
  }

  return filters;
}

export function generateFilterObject(services) {
  const appFilters = getAppsFilters(services, filtersList);

  const filterObject = {};

  for (const key in appFilters) {
    filterObject[key] = {};
    appFilters[key].forEach((filterValue) => {
      filterObject[key][filterValue] = false;
    });
  }

  return filterObject;
}

export function generateFilterCounts(filteredServices, services) {
  // get list of all filters available
  const filters =  getAppsFilters(services, filtersList);

  const filterCounts = {};
  for (const filterType of Object.keys(filters)) {
    filterCounts[filterType] = {};
    for (const filterValue of filters[filterType]) {
      filterCounts[filterType][filterValue] = 0;
    }
  }

  for (const service of filteredServices) {
    for (const filterType of Object.keys(filterCounts)) {
      const filters = service[filterType];
      if (filters) {
        if (typeof filters === 'string') {
          if (filterCounts[filterType][filters] !== undefined) {
            filterCounts[filterType][filters]++;
          }
        } else if (Array.isArray(filters)) {
          filters.forEach((filter) => {
            if (filterCounts[filterType][filter] !== undefined) {
              filterCounts[filterType][filter]++;
            }
          });
        }
      }
    }
  }

  return filterCounts;
}
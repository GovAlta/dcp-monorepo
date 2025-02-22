import dayjs from 'dayjs';
import type { Service } from '../../types/types';
import type { ServiceFilterKey } from '../services/config';
import type { RoadmapFilterKey } from '../roadmap/config';

type FilterKey = ServiceFilterKey | RoadmapFilterKey;

export function capitalizeFirstWord(s: string) {
  return s.replace(/(^|[^a-zA-Z])[a-z]/g, (match) => match.toUpperCase());
}

export function getAppsFilters(apps: Service[], filterKeys: FilterKey[]) {
  const filters: any = {};
  const indexedItems: any = {};

  apps.forEach((app: Service) => {
    filterKeys.forEach((key) => {
      const propValue: any = app[key];

      if (propValue) {
        if (Array.isArray(propValue)) {
          // If the property is an array, add each element to the filter
          propValue.forEach((element: any) => {
            if (!filters[key]) {
              filters[key] = new Set();
            }
            if (typeof element === 'object') {
              filters[key].add(...Object.values(element));

              Object.values(element).forEach((value: any) => {
                indexedItems[value] = (indexedItems[value] || new Set()).add(
                  app.appId,
                );
              });
            } else {
              filters[key].add(element);
              indexedItems[element] = (indexedItems[element] || new Set()).add(
                app.appId,
              );
            }
          });
        } else {
          // If the property is not an array, add it directly to the filter
          if (!filters[key]) {
            filters[key] = new Set();
          }
          filters[key].add(app[key]);
          indexedItems[propValue] = (indexedItems[propValue] || new Set()).add(
            app.appId,
          );
        }
      }
    });
  });

  // Convert Set back to array and add 'Other' to each filter
  for (const key in filters) {
    filters[key] = Array.from(filters[key]).sort();
  }

  return {
    filters,
    indexedItems,
  };
}

export function generateFilterObject(
  services: Service[],
  filtersList: FilterKey[],
) {
  const { filters } = getAppsFilters(services, filtersList);

  const filterObject: any = {};

  for (const key in filters) {
    filterObject[key] = {};
    filters[key].forEach((filterValue: FilterKey) => {
      filterObject[key][filterValue] = false;
    });
  }

  return filterObject;
}

export function getLastUpdatedDate(services: Service[]) {
  let lastUpdatedDate = dayjs(0);
  let hasLastUpdatedDate = false;

  for (const service of services) {
    if (service.lastUpdatedDate) {
      const date = dayjs(service.lastUpdatedDate);
      if (date > lastUpdatedDate) {
        lastUpdatedDate = date;
        hasLastUpdatedDate = true;
      }
    }
  }

  return hasLastUpdatedDate ? lastUpdatedDate.format() : '';
}

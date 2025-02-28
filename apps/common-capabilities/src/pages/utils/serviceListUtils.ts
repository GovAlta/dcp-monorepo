import dayjs from 'dayjs';
import type { Service } from '../../types/types';
import type { ServiceFilterKey } from '../services/config';
import type { RoadmapFilterKey } from '../roadmap/config';

type FilterKey = ServiceFilterKey | RoadmapFilterKey;

export function capitalizeFirstWord(s: string) {
    return s.replace(/(^|[^a-zA-Z])[a-z]/g, (match) => match.toUpperCase());
}

export function getAppsFilters(apps: Service[], filterKeys: FilterKey[]) {
    const filters: Partial<Record<FilterKey, Set<string>>> = {};
    const indexedItems: Record<string, Set<string>> = {};

    apps.forEach((app: Service) => {
        filterKeys.forEach((key) => {
            const appPropValue = app[key];

            if (appPropValue) {
                if (Array.isArray(appPropValue)) {
                    // If the property is an array, add each element to the filter
                    appPropValue.forEach((element) => {
                        if (typeof element === 'object') {
                            Object.values(element).forEach((value) => {
                                (filters[key] ??= new Set()).add(value);
                                indexedItems[value] = (
                                    indexedItems[value] || new Set()
                                ).add(app.appId);
                            });
                        } else {
                            (filters[key] ??= new Set()).add(element);
                            indexedItems[element] = (
                                indexedItems[element] || new Set()
                            ).add(app.appId);
                        }
                    });
                } else {
                    (filters[key] ??= new Set()).add(appPropValue);
                    indexedItems[appPropValue] = (
                        indexedItems[appPropValue] || new Set()
                    ).add(app.appId);
                }
            }
        });
    });

    const result: Partial<Record<FilterKey, string[]>> = {};
    // Convert Set back to array and add 'Other' to each filter
    for (const key in filters) {
        result[key as FilterKey] = Array.from(
            filters[key as FilterKey] as Set<string>,
        ).sort();
    }

    return {
        filters: result,
        indexedItems,
    };
}

export function generateFilterObject(
    services: Service[],
    filtersList: FilterKey[],
) {
    const { filters } = getAppsFilters(services, filtersList);
    const filterObject: Partial<
        Record<FilterKey, Partial<Record<string, boolean>>>
    > = {};

    for (const key in filters) {
        const filterKey = key as FilterKey;
        filterObject[filterKey] = {};
        filters[filterKey]?.forEach((filterValue) => {
            const filter = filterObject[filterKey];
            if (filter) {
                filter[filterValue] = false;
            }
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

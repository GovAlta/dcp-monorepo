import { filtersList } from './config';
export function extractAvailableFilters(apps) {
  const countOccurrences = (property) => {
    let obj = {};
    let count = [];

    apps.forEach((item) => {
      if (Array.isArray(item[property])) {
        item[property].forEach((value) => {
          if (value && value.trim() !== '' && value.toUpperCase() !== 'N/A') {
            obj[value] = (obj[value] || 0) + 1;
          }
        });
      } else if (
        item[property] &&
        item[property].trim() !== '' &&
        item[property].toUpperCase() !== 'N/A'
      ) {
        obj[item[property]] = (obj[item[property]] || 0) + 1;
      }
    });

    count = Object.entries(obj)
      .map(([value, count]) => ({ value, count }))
      .sort((a, b) => a.value.localeCompare(b.value));

    return { filters: count };
  };

  let result = {};

  filtersList.forEach((property) => {
    result[property] = countOccurrences(property);
  });

  return result;
}
export function capitalizeFirstWord(s) {
  return s.replace(/(^|[^a-zA-Z])[a-z]/g, (match) => match.toUpperCase());
}

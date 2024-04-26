// the names in the filterList and the keys in the defaultState objects should match
export const defaultState = {
  selectedFilters: {
    Environment: [],
    Language: [],
    Keywords: [],
    Status: [],
    FunctionalGroup: [],
  },
};

export const filtersList = [
  'Environment',
  'Language',
  'Keywords',
  'Status',
  'FunctionalGroup',
];

export const filterListCustom = [
  {
    title: 'Category',
    property: 'FunctionalGroup',
  },
  {
    title: 'Infrastructure',
    property: 'Environment',
  },
  {
    title: 'Language',
    property: 'Language',
  },
  {
    title: 'Keywords',
    property: 'Keywords',
  },
  {
    title: 'Status',
    property: 'Status',
  },
];

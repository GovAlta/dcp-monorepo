// the names in the filterList and the keys in the defaultState objects should match
export const defaultState = {
  selectedFilters: {
    environment: [],
    language: [],
    keywords: [],
    status: [],
    functionalGroup: [],
  },
};

export const filtersList = [
  'environment',
  'language',
  'keywords',
  'status',
  'functionalGroup',
];

export const filterListCustom = [
  {
    title: 'Category',
    property: 'functionalGroup',
  },
  {
    title: 'Infrastructure',
    property: 'environment',
  },
  {
    title: 'Language',
    property: 'language',
  },
  {
    title: 'Keywords',
    property: 'keywords',
  },
  {
    title: 'Status',
    property: 'status',
  },
];

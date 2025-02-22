// the names in the filterList and the keys in the defaultState objects should match
export const defaultState = {
  selectedFilters: {
    provider: [],
    functionalGroup: [],
    status: [],
    environment: [],
    language: [],
    keywords: [],
  },
};

export const filtersList = [
  'provider',
  'functionalGroup',
  'status',
  'environment',
  'language',
  'keywords',
] as const;

export type RoadmapFilterKey = (typeof filtersList)[number];

export const filterListCustom = [
  {
    title: 'Provider',
    property: 'provider',
  },
  {
    title: 'Category',
    property: 'functionalGroup',
  },
  {
    title: 'Status',
    property: 'status',
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
];

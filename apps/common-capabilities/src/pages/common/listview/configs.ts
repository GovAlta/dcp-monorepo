import { FilterableField, FilterState } from '../../types/types';

// the names in the filterList and the keys in the defaultState objects should match
export const defaultSelectedFilters: FilterState = {
  provider: [],
  functionalGroup: [],
  status: [],
  environment: [],
  language: [],
  keywords: [],
};

export const filtersList: FilterableField[] = [
  'provider',
  'functionalGroup',
  'status',
  'environment',
  'language',
  'keywords',
];

export const filterListCustom: { title: string; property: FilterableField }[] =
  [
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

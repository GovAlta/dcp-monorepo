import { Service } from '../../types/types';

export type FilterableField = keyof Pick<
  Service,
  | 'environment'
  | 'language'
  | 'keywords'
  | 'status'
  | 'functionalGroup'
  | 'provider'
>;

export type FilterState = {
  [key in FilterableField]: string[];
};

export type FilterCheckboxState = {
  [key in FilterableField]: {
    [key: string]: boolean;
  };
};

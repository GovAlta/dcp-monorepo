// the names in the filterList and the keys in the defaultState objects should match
export const defaultState = {
    selectedFilters: {
        environment: [],
        language: [],
        keywords: [],
        status: [],
        functionalGroup: [],
        provider: [],
    },
};

export const filtersList = [
    'environment',
    'language',
    'keywords',
    'status',
    'functionalGroup',
    'provider',
] as const;

export type ServiceFilterKey = (typeof filtersList)[number];

export const filterListCustom = [
    {
        title: 'Category',
        property: 'functionalGroup',
    },
    {
        title: 'Provider',
        property: 'provider',
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

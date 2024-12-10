const formDefinitions = {
  'common capabilities intake': {
    dataSchema: {
      type: 'object',
      properties: {
        recommended: {
          type: 'boolean',
        },
        serviceName: {
          type: 'string',
          description: 'A clear and concise name for your service.',
        },
        summary: {
          type: 'string',
          description: 'Short description used for listing tile',
        },
        description: {
          type: 'string',
          minLength: 20,
          errorMessage: {
            minLength: 'Please enter a longer description',
          },
        },
        provider: {
          type: 'string',
          description: 'The team or individual responsible for the service.',
          enum: [
            'Advanced Education',
            'Alberta Digital Service Platform (ADSP)',
            "Children's Services Platform",
            'Data and Content Management',
            'Digital Design and Delivery (DDD)',
            'Justice Digital',
            'Platforms - Common Data Services',
            'Platforms - IAM',
            'Platforms - Common Platforms',
            'Seniors, Community and Social Services (SCSS)',
            'Service Integration',
            'Wildfire Platform',
            'Other',
          ],
        },
        functionalGroup: {
          type: 'string',
          enum: [
            'Automation',
            'Communication',
            'Data',
            'Finance',
            'Forms and documents',
            'Performance',
            'User management',
            'Other',
          ],
        },
        usageMethod: {
          type: 'string',
          enum: ['', 'API', 'Code', 'Service', 'Other'],
        },
        status: {
          type: 'string',
          enum: [
            '',
            'Live',
            'Alpha',
            'Beta',
            'Future',
            'Deprecated',
            'Decommissioned',
            'Other',
          ],
        },
        version: {
          type: 'string',
          description: 'Example: 4.14.0',
        },
        prerequisites: {
          type: 'string',
          description:
            'Any specific requirements or dependencies needed to use the service',
        },
        useCases: {
          type: 'string',
          description:
            'Common scenarios or examples of how the service can be used',
        },
        comments: {
          type: 'string',
          description: 'Important information not previously addressed',
        },
        supportLevel: {
          type: 'string',
        },
        filterText: {
          type: 'string',
        },
        documentation: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
                description: 'Display name the user will see',
              },
              url: {
                type: 'string',
                description: 'Actual URL address',
                pattern:
                  '^(https?://)?(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{2,6}([-a-zA-Z0-9()@:%_+.~#?&/=]*)$',
                errorMessage: {
                  pattern: 'Invalid email address',
                },
              },
            },
          },
        },
        environment: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              item: {
                type: 'string',
              },
            },
          },
        },
        language: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              item: {
                type: 'string',
              },
            },
          },
        },
        audience: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              item: {
                type: 'string',
              },
            },
          },
        },
        keywords: {
          type: 'array',
          description:
            'Relevant keywords to help users find the service through search',
          items: {
            type: 'object',
            properties: {
              item: {
                type: 'string',
                maxLength: 25,
                description: 'Single keyword',
              },
            },
          },
        },
        contact: {
          type: 'object',
          properties: {
            details: {
              type: 'string',
              description: 'Special reqirements when contacting',
            },
            methods: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  type: {
                    type: 'string',
                    enum: [
                      'BERNIE',
                      'GitHub',
                      'Slack',
                      'Web',
                      'Phone',
                      'Email',
                    ],
                  },
                  value: {
                    type: 'string',
                    description: 'Display name',
                  },
                  url: {
                    type: 'string',
                    pattern:
                      '^(https?://)?(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\\.[a-zA-Z0-9()]{2,6}([-a-zA-Z0-9()@:%_+.~#?&/=]*)$|^\\(?\\d{3}\\)?[-.\\s]?\\d{3}[-.\\s]?\\d{4}$',
                    errorMessage: {
                      pattern: 'Invalid entry',
                    },
                  },
                },
              },
              required: ['type', 'url'],
            },
          },
        },
        cmra: {
          type: 'string',
          enum: ['', 'n/a', 'No', 'Completed'],
        },
        stra: {
          type: 'string',
          enum: ['', 'n/a', 'No', 'Completed'],
        },
        cmraReq: {
          type: 'string',
          enum: ['', 'n/a', 'No', 'Required'],
        },
        im: {
          type: 'string',
          enum: ['', 'n/a', 'No', 'Required'],
        },
        risk: {
          type: 'string',
          enum: ['', 'n/a', 'No', 'Required'],
        },
        cybersecurity: {
          type: 'string',
          enum: ['', 'n/a', 'No', 'Required'],
        },
        data: {
          type: 'string',
          enum: ['', 'n/a', 'No', 'Required'],
        },
        classification: {
          type: 'string',
          enum: ['', 'Public', 'Protected A', 'Protected B', 'Protected C'],
        },
        controller: {
          type: 'string',
          description: 'Job role (not individual)',
        },
        considerations: {
          type: 'string',
          description: 'Any special security considerations for this service',
        },
        editorName: {
          type: 'string',
          description:
            'The individual providing the information on the service',
        },
        editorEmail: {
          type: 'string',
          format: 'email',
          description:
            'This email would be used for communicating on the status of this request',
        },
        roadmap: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              when: {
                type: 'string',
                pattern: '^[0-9]{4} Q[1-4]$|^(TBD)$',
                description: "Either a quarter shown as 'YYYY Q#' or TBD",
                errorMessage: {
                  pattern: "Must be as example '2024 Q2' or 'TBD' ",
                },
              },
              title: {
                type: 'string',
                description: 'About 50-60 characters',
              },
              status: {
                type: 'string',
                enum: ['', 'Committed', 'Tentative'],
              },
              type: {
                type: 'string',
                enum: [
                  '',
                  'Addition',
                  'Alteration',
                  'Deprecation',
                  'Removal',
                  'Fix',
                  'Security Improvement',
                  'Other',
                ],
              },
              description: {
                type: 'string',
                maxLength: 400,
                description: 'A brief summary of the change',
              },
              impacts: {
                type: 'string',
                description: 'A list of impacts',
              },
              impactsArray: {
                type: 'array',
                items: {
                  type: 'object',
                  properties: {
                    item: {
                      type: 'string',
                    },
                  },
                },
              },
            },
            required: [
              'when',
              'title',
              'status',
              'type',
              'description',
              'impacts',
            ],
          },
        },
      },
      required: [
        'serviceName',
        'status',
        'functionalGroup',
        'provider',
        'summary',
        'description',
        'contact',
        'editorName',
        'editorEmail',
      ],
    },
    uiSchema: {
      type: 'Categorization',
      options: {
        variant: 'stepper',
        showNavButtons: true,
      },
      elements: [
        {
          type: 'Category',
          label: 'Overview',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'HelpContent',
                  label: 'Overview',
                  options: {
                    variant: 'details',
                    help: [
                      'Service Name: A clear and concise name for your service.',
                      'Category: The primary category or domain of your service.',
                      'Status: The current status of the service.',
                      'Provider: The team responsible for the service.',
                    ],
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/serviceName',
                },
                {
                  type: 'Control',
                  scope: '#/properties/functionalGroup',
                  label: 'Category',
                },
                {
                  type: 'Control',
                  scope: '#/properties/status',
                },
                {
                  type: 'Control',
                  scope: '#/properties/provider',
                },
                {
                  type: 'Control',
                  scope: '#/properties/recommended',
                  label: 'Recommended',
                },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Description',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'HelpContent',
                  label: 'Description',
                  options: {
                    variant: 'details',
                    help: [
                      'Summary: A brief overview of the service, its purpose, and its target audience.',
                      "Description and Features: A detailed description of the service's functionality, key features, and benefits.",
                      'Documentation Links: Links to any relevant documentation, such as API documentation, user guides, or tutorials.',
                    ],
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/summary',
                  label: 'Summary',
                },
                {
                  type: 'Control',
                  scope: '#/properties/description',
                  options: {
                    multi: true,
                    componentProps: {
                      rows: 8,
                      placeholder:
                        'An overview describing features of the service. Full details to be provided via the documentation links below.',
                    },
                  },
                },
                {
                  type: 'ListWithDetail',
                  scope: '#/properties/documentation',
                  options: {
                    itemLabel: 'Document',
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Technical',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'HelpContent',
                  label: 'Technical Details (Specifications)',
                  options: {
                    variant: 'details',
                    help: [
                      'Prerequisites: Any specific requirements or dependencies needed to use the service.',
                      'Use Cases: Common scenarios or examples of how the service can be used.',
                      'Keywords: Relevant keywords to help users find the service through search.',
                      'Usages: Specific ways in which the service can be used, including code examples or snippets.',
                      'Infrastructure Supported: The underlying infrastructure or platforms on which the service runs.',
                      'Programming Languages: The primary programming languages used in the service.',
                      'Additional Information: Any other relevant information, such as security considerations, performance metrics, or troubleshooting tips.',
                    ],
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/prerequisites',
                  options: {
                    multi: true,
                    componentProps: {
                      rows: 2,
                    },
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/useCases',
                  options: {
                    multi: true,
                    componentProps: {
                      rows: 5,
                    },
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/keywords',
                  label: 'Keywords',
                  componentProps: {
                    placeholder: 'Single keyword',
                  },
                },
                {
                  type: 'HorizontalLayout',
                  elements: [
                    {
                      type: 'Control',
                      scope: '#/properties/usageMethod',
                      label: 'Usage',
                    },
                    {
                      type: 'Control',
                      scope: '#/properties/version',
                    },
                  ],
                },
                {
                  type: 'HorizontalLayout',
                  elements: [
                    {
                      type: 'Control',
                      scope: '#/properties/environment',
                      label: 'Infrastructure',
                    },
                    {
                      type: 'Control',
                      scope: '#/properties/language',
                      label: 'Language',
                    },
                  ],
                },
                {
                  type: 'Control',
                  scope: '#/properties/comments',
                  label: 'Additional information',
                  options: {
                    multi: true,
                    componentProps: {
                      rows: 2,
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Contact',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'HelpContent',
                  label: 'Contact',
                  options: {
                    variant: 'details',
                    help: [
                      'Email: Primary email address for service-related inquiries.',
                      'Slack: Slack handle or channel for real-time communication.',
                      'Phone Number: Your phone number for urgent or sensitive matters.',
                      "GitHub Repository: Link to the service's GitHub repository for code access and issue tracking.",
                      "Website: Link to the service's website or documentation portal.",
                      'Notes: Any additional contact information or preferred communication methods.',
                    ],
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/contact/properties/details',
                  label: 'Note (optional)',
                },
                {
                  type: 'ListWithDetail',
                  scope: '#/properties/contact/properties/methods',
                  label: 'Contact methods',
                  options: {
                    itemLabel: 'Method',
                  },
                  elements: [
                    {
                      type: 'HorizontalLayout',
                      elements: [
                        {
                          type: 'Control',
                          scope: '#/properties/type',
                          label: 'Using',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/value',
                          label: 'Display name',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/url',
                          label: 'Contact value',
                        },
                      ],
                    },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Roadmap',
          elements: [
            {
              type: 'HelpContent',
              label: 'Why is this information needed?',
              options: {
                variant: 'details',
                help: [
                  'Enhance Collaboration and Alignment: User teams are likely to adopt services that are expected to have long-term utility.',
                  'Facilitate Risk Management and Contingency Planning: User teams can proactively identify potential challenges and resolve them earlier.',
                ],
              },
            },
            {
              type: 'HelpContent',
              label: 'Roadmap fields',
              options: {
                variant: 'details',
                help: [
                  'When: Estimated timelines for the implementation of these changes.',
                  'Title: A list of planned changes, features, or enhancements.',
                  'Roadmap Status: Indicate whether the changes are committed or tentative.',
                  'Type of Change: Specify the type of change (e.g., addition, security improvement, bug fix, removal, deprecation).',
                  'Description: Details of the changes planned.',
                  'Impact: Describe the potential impact of the changes on users and other services.',
                ],
              },
            },
            {
              type: 'ListWithDetail',
              scope: '#/properties/roadmap',
              label: 'Roadmap item',
              options: {
                detail: {
                  type: 'VerticalLayout',
                  elements: [
                    {
                      type: 'VerticalLayout',
                      elements: [
                        {
                          type: 'Control',
                          scope: '#/properties/when',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/title',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/status',
                          label: 'Roadmap Status',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/type',
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/description',
                          options: {
                            multi: true,
                            componentProps: {
                              rows: 6,
                            },
                          },
                        },
                        {
                          type: 'Control',
                          scope: '#/properties/impacts',
                          options: {
                            multi: true,
                            componentProps: {
                              rows: 7,
                              placeholder:
                                'A list of impacts.\nPlease separate each item with a new line (enter key)',
                            },
                          },
                        },
                      ],
                    },
                  ],
                },
              },
            },
          ],
        },
        {
          type: 'Category',
          label: 'Security',
          elements: [
            {
              type: 'HelpContent',
              label: 'Security',
              options: {
                variant: 'details',
                help: [
                  'Risk Assessment: Indicate whether a cybersecurity risk assessment has been completed.',
                  'Security Consultations: Detail any security consultations or assessments that are required *before* using this service (e.g., data security, cybersecurity).',
                  'Security details: Specify the information security classification of the service (e.g. Public, Protected A/B/C), Information Controller and any special considerations.',
                ],
              },
            },
            {
              type: 'Group',
              label: 'Risk assessment completion status',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/stra',
                  label: 'General cybersecurity risk assessment',
                },
              ],
            },
            {
              type: 'Group',
              label: 'Required before using this service',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/data',
                  label: 'Data team consult',
                },
                {
                  type: 'Control',
                  scope: '#/properties/risk',
                  label: 'Cybersecurity risk assessment',
                },
                {
                  type: 'Control',
                  scope: '#/properties/cybersecurity',
                  label: 'Cybersecurity consult',
                },
              ],
            },
            {
              type: 'Group',
              label: 'Security details',
              elements: [
                {
                  type: 'Control',
                  scope: '#/properties/classification',
                  label: 'Information security classification',
                },
                {
                  type: 'Control',
                  scope: '#/properties/controller',
                  label: 'Information controller',
                },
                {
                  type: 'Control',
                  scope: '#/properties/considerations',
                  label: 'Special considerations',
                  options: {
                    multi: true,
                    componentProps: {
                      rows: 3,
                    },
                  },
                },
              ],
            },
          ],
        },
        {
          type: 'Category',
          label: 'Editor',
          elements: [
            {
              type: 'VerticalLayout',
              elements: [
                {
                  type: 'HelpContent',
                  label: 'Why are we asking for your information?',
                  options: {
                    help: [
                      'This will be used to inform you when your submission has been accepted or rejected.',
                      'Please note, after a service has been accepted, it can take up to an hour to show up on the Common Capabilities listing.',
                    ],
                  },
                },
                {
                  type: 'Control',
                  scope: '#/properties/editorName',
                  label: 'Editor name',
                },
                {
                  type: 'Control',
                  scope: '#/properties/editorEmail',
                  label: 'Editor email',
                },
              ],
            },
          ],
        },
      ],
    },
    roles: [
      {
        role: 'capability-intake',
        scope: ['Applicant roles', 'Clerk roles', 'Assessor roles'],
      },
    ],
    lifeCycle: {
      allowAnonymousSubmissions: true,
      createSubmissionRecords: true,
      securityClassification: 'Public',
      taskQueue: 'common-capabilities:listings review',
      dispositionStates: ['approved', 'rejected'],
    },
  },
};

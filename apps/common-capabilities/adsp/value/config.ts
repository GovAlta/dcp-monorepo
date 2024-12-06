const values = {
  'common-capabilities': {
    'published-index': {
      payloadSchema: {
        type: 'object',
        properties: {
          index: {
            type: 'array',
            items: {
              type: 'string',
            },
          },
        },
        required: [],
        additionalProperties: true,
      },
    },
  },
};

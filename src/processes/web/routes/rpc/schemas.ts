export const submitSyncSchema = {
  body: {
    type: 'object',
    properties: {
      procedure: { type: 'string' },
      params: { type: 'object' }
    },
    required: ['procedure'],
    additionalProperties: false
  }
}

export const submitAsyncSchema = submitSyncSchema

export const fetchAsyncSchema = {
  params: {
    type: 'object',
    properties: {
      id: { type: ['number', 'string'] }
    },
    required: ['id'],
    additionalProperties: false
  }
}

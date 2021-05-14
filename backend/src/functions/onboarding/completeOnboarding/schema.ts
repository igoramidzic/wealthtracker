export default {
  type: "object",
  properties: {
    completed: { type: 'boolean' }
  },
  required: ['completed']
} as const;

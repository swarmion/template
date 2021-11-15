import { JSONSchema } from 'json-schema-to-ts';

export const serviceOptionsSchema = {
  type: 'object',
  properties: {
    provides: { type: 'array', items: { type: 'object' } },
    consumes: { type: 'array', items: { type: 'object' } },
  },
  required: ['provides', 'consumes'],
} as const;

export type ServerlessContracts = {
  contracts: { provides: JSONSchema[]; consumes: JSONSchema[] };
};

import { httpApiIdExportName } from '@sls-monorepo/serverless-configuration';

export const HttpApiId = {
  Value: {
    Ref: 'HttpApi',
  },
  Export: {
    Name: httpApiIdExportName,
  },
};

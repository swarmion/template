import { resolve } from 'path';

import { jestConfig } from '@sls-monorepo/configuration';

export default {
  ...jestConfig,
  moduleNameMapper: {
    '^utils/(.*)$': resolve(__dirname, 'utils/$1'),
  },
};

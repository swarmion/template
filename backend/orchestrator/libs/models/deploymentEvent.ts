import { Entity } from 'dynamodb-toolbox';

import DeploymentTable from '../deploymentTable';

const DeploymentEvent = new Entity({
  name: 'DeploymentEvent',
  attributes: {
    stackId: { partitionKey: true },
    timestamp: { sortKey: true, hidden: true },
  },
  table: DeploymentTable,
} as const);

export default DeploymentEvent;

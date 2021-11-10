import { CloudFormationContract } from '@sls-monorepo/serverless-contracts';

export const httpApiResourceContract = new CloudFormationContract({
  key: '${self:custom.projectName}-HttpApiId-${self:provider.stage}',
});

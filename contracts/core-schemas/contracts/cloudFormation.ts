import { CloudFormationContract } from '@sls-monorepo/serverless-contracts';

export const httpApiResourceContract = new CloudFormationContract({
  name: 'CoreHttpApi',
});

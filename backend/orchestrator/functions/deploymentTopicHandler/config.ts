import {
  getHandlerPath,
  LambdaFunction,
} from '@sls-monorepo/serverless-helpers';

const config: LambdaFunction = {
  environment: {},
  handler: getHandlerPath(__dirname),
  events: [
    { sns: { arn: { Ref: 'DeploymentTopic' }, topicName: 'deploymentTopic' } },
  ],
};

export default config;

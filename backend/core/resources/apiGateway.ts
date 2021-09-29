export const HttpApiId = {
  Value: {
    Ref: 'HttpApi',
  },
  Export: {
    Name: '${self:custom.projectName}-HttpApiId-${self:provider.stage}',
  },
};

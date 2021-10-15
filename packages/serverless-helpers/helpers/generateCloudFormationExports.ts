interface Ref {
  Ref: string;
}

interface CloudFormationExport {
  Value: string | Ref;
  Export: { Name: string };
}

export const generateCloudFormationExports = <Keys extends string>(
  configuration: Record<Keys, string | Ref>,
): Record<Keys, CloudFormationExport> =>
  Object.entries(configuration).reduce(
    (prev, [exportName, exportValue]) => ({
      ...prev,
      [exportName]: {
        Value: exportValue,
        Export: {
          Name: `\${self:custom.projectName}-${exportName}-\${self:provider.stage}`,
        },
      },
    }),
    {} as Record<Keys, CloudFormationExport>,
  );

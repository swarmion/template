/**
 * The CloudFormation importValue type.
 *
 * See https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html
 */
export type CloudFormationImport<Key extends string> = {
  'Fn::ImportValue': Key;
};

/**
 * The CloudFormation export type.
 *
 * See https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html
 */
export type CloudFormationExport<Key extends string, Value> = {
  Description: string;
  Value: Value;
  Export: { Name: Key };
};

export interface FullContractSchemaType<Key extends string> {
  type: 'object';
  properties: {
    contractType: { const: 'cloudFormation' };
    key: { const: Key };
  };
  required: ['key', 'contractType'];
  additionalProperties: false;
}

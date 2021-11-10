import { GenericContract } from 'types/genericContract';

import {
  CloudFormationExport,
  CloudFormationImport,
  FullContractSchemaType,
} from './types';

/**
 * CloudFormationContract:
 *
 * a contract used to define a type-safe import/export through CloudFormation.
 *
 * Main features:
 * - export and import generated and type-safe;
 * - generation of a contract document that can be checked for breaking changes;
 */
export class CloudFormationContract<Key extends string>
  implements GenericContract
{
  private _key: Key;

  /**
   * Builds a new ApiGateway contract
   *
   * @param key the name of the export
   * See https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html
   */
  constructor({ key }: { key: Key }) {
    this._key = key;
  }

  /**
   * @returns the CloudFormation { Fn::ImportValue } function corresponding to the key
   */
  get importValue(): CloudFormationImport<Key> {
    return { 'Fn::ImportValue': this._key };
  }

  /**
   * @param description the description used in CloudFormation for this value
   * @param value the CloudFormation function passed to the export
   * For more information, see https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/intrinsic-function-reference-importvalue.html
   * @returns the CloudFormation Export function
   */
  exportValue<Value>({
    description,
    value,
  }: {
    description: string;
    value: Value;
  }): CloudFormationExport<Key, Value> {
    // @ts-ignore somehow the type inference does not work here
    return {
      [this._key]: {
        Description: description,
        Value: value,
        Export: { Name: this._key },
      },
    };
  }

  get fullContractSchema(): FullContractSchemaType<Key> {
    return {
      type: 'object',
      properties: {
        contractType: { const: 'cloudFormation' },
        key: { const: this._key },
      },
      required: ['key', 'contractType'],
      additionalProperties: false,
    };
  }
}

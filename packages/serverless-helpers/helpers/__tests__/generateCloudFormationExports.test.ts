import { generateCloudFormationExports } from '../generateCloudFormationExports';

/**
 * helpers tests
 *
 * @group unit/helpers
 */
describe('root service helpers.ts', () => {
  it('should return an empty object if no exports are given', () => {
    expect(generateCloudFormationExports({})).toEqual({});
  });

  it('should return a correct export with a string argument', () => {
    expect(generateCloudFormationExports({ Foo: 'bar' })).toEqual({
      Foo: {
        Value: 'bar',
        Export: {
          Name: '${self:custom.projectName}-Foo-${self:provider.stage}',
        },
      },
    });
  });

  it('should return a correct export with a ref argument', () => {
    expect(generateCloudFormationExports({ Foo: { Ref: 'bar' } })).toEqual({
      Foo: {
        Value: { Ref: 'bar' },
        Export: {
          Name: '${self:custom.projectName}-Foo-${self:provider.stage}',
        },
      },
    });
  });

  it('should return a correct export with a ref and a string arguments', () => {
    expect(
      generateCloudFormationExports({ Foo: { Ref: 'bar' }, Bar: 'foo' }),
    ).toEqual({
      Foo: {
        Value: { Ref: 'bar' },
        Export: {
          Name: '${self:custom.projectName}-Foo-${self:provider.stage}',
        },
      },
      Bar: {
        Value: 'foo',
        Export: {
          Name: '${self:custom.projectName}-Bar-${self:provider.stage}',
        },
      },
    });
  });
});

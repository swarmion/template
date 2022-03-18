import {
  checkFilesExist,
  ensureNxProject,
  runNxCommandAsync,
  uniq,
} from '@nrwl/nx-plugin/testing';
describe('library e2e', () => {
  it('should create library', async () => {
    const plugin = uniq('library');
    // Creation of a boilerplate that doesn't at all like the template
    // That's why the generation of the library from the generator fails
    // If we want to perform e2e tests, we need to replicate the template architecture
    // Maybe pull the @swarmion/template repo ?
    ensureNxProject(
      '@swarmion-starter/packages-generator',
      'dist/packages/packages-generator',
    );
    await runNxCommandAsync(
      `generate @swarmion-starter/packages-generator:library ${plugin}`,
    );

    expect(() =>
      checkFilesExist(`libs/subdir/${plugin}/src/index.ts`),
    ).not.toThrow();
  }, 120000);
});

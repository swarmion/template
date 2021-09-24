module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  coverageReporters: ['json', ['lcov', { projectRoot: './' }]],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};

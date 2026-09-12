/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
  extensionsToTreatAsEsm: ['.ts'],
  preset: 'ts-jest',
  setupFiles: ['./src/utils/polyfill.ts'],
  testEnvironment: 'node',
  testMatch: ['**/*.spec.ts'],
  verbose: true,
};

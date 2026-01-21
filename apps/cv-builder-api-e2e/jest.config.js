module.exports = {
  displayName: 'cv-builder-api-e2e',
  // preset: '../../jest.preset.js',
  globalSetup: '<rootDir>/src/support/global-setup.js',
  globalTeardown: '<rootDir>/src/support/global-teardown.js',
  setupFiles: ['<rootDir>/src/support/test-setup.js'],
  testEnvironment: 'node',
  // transform: { ... },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../coverage/cv-builder-api-e2e',
};

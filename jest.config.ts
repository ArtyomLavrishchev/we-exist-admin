export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        'ts-jest': {
          isolatedModules: true,
        },
      },
    ],
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  modulePaths: ['<rootDir>src'],
  testMatch: ['<rootDir>src/**/*(*.)@(spec|test).[tj]s?(x)'],
  moduleDirectories: ['node_modules'],
  modulePathIgnorePatterns: ['index.ts', 'setupTests.ts', 'jest.config.ts'],
  rootDir: './',
  // collectCoverage: true,
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  setupFiles: ['<rootDir>src/jestMocks.ts'],
  setupFilesAfterEnv: ['<rootDir>src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|scss)$': 'identity-obj-proxy',
  },
};

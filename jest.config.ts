import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest', // Tells Jest to use ts-jest for transforming TypeScript files
  setupFilesAfterEnv: ['<rootDir>/tests/setupTests.ts'], // Ensure this points to your setupTests.ts file
  testEnvironment: 'jest-environment-jsdom', // Use jsdom as the test environment for React
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest', // Transform TypeScript and TypeScript JSX (tsx) files
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json', 'node'],
  collectCoverage: true,
};

export default config;

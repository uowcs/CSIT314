/**
 * Jest Testing Configuration
 * ==========================
 *
 * @see https://nextjs.org/docs/architecture/nextjs-compiler#jest
 * @see https://jest-extended.jestcommunity.dev/docs/getting-started/setup
 * @see https://github.com/MichalLytek/type-graphql/blob/master/jest.config.ts
 */

const nextJest = require("next/jest");

const createJestConfig = nextJest({ dir: "./" });

const customJestConfig = {
  rootDir: "./",
  verbose: true,  // Set to true for detailed logging during test runs; helpful for debugging
  preset: "ts-jest",
  testEnvironment: "node",  // Suitable for testing web applications
  extensionsToTreatAsEsm: ['.ts', '.tsx'],  // Consider .ts and .tsx files as ES Modules
  coverageDirectory: "<rootDir>/coverage",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],  // Configure any global setup necessary before tests run
  moduleNameMapper: { 
    "^~/(.*)$": "<rootDir>/src/$1"  // Mapping to resolve '~' as the src directory
  },
  moduleDirectories: ["node_modules", "<rootDir>/"],
  roots: ["<rootDir>/src", "<rootDir>/src/tests/jest"],  // Roots contain your source code and tests
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverageFrom: [
    "<rootDir>/src/**/*.{js,jsx,ts,tsx}", 
    "!<rootDir>/src/**/*.d.ts"  // Avoid including TypeScript declaration files in coverage reports
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',  // Use babel-jest for all JS and TS files
  },
  
  transformIgnorePatterns: [
    "node_modules/(?!(module-that-needs-transpiling|@t3-oss))"  // Explicitly include the troublesome module
  ],
  
};

// createJestConfig is exported this way to ensure that
// next/jest can load the nextjs config which is asynchronous
module.exports = createJestConfig(customJestConfig);

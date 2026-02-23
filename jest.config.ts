import type { Config } from "jest";
import nextJest from "next/jest.js";

const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/tests/__setup__/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testMatch: [
    "<rootDir>/tests/unit/**/*.test.{ts,tsx}",
    "<rootDir>/tests/integration/**/*.test.ts",
  ],
  transformIgnorePatterns: ["/node_modules/(?!(msw|@mswjs|until-async)/)"],
  globals: {
    "ts-jest": { tsconfig: "tsconfig.test.json" },
  },
  collectCoverageFrom: [
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
    "lib/**/*.{ts,tsx}",
    "hooks/**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/*.stories.{ts,tsx}",
  ],
};

// Override transformIgnorePatterns after next/jest merges its own /node_modules/ pattern.
// Jest ignores a file if ANY pattern matches, so we must replace — not append.
export default async () => {
  const resolved = await (createJestConfig(config) as () => Promise<Config>)();
  return {
    ...resolved,
    transformIgnorePatterns: ["/node_modules/(?!(msw|@mswjs|until-async)/)"],
  };
};

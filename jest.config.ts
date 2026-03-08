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
    "components/ui/Button.tsx",
    "components/ui/Input.tsx",
    "lib/auth.service.ts",
    "lib/endpoints.ts",
    "lib/hooks/useAuth.ts",
  ],
};

const configAsync = async () => {
  const resolved = await (createJestConfig(config) as () => Promise<Config>)();
  return {
    ...resolved,
    transformIgnorePatterns: ["/node_modules/(?!(msw|@mswjs|until-async)/)"],
  };
};

export default configAsync;

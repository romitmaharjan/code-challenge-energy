import type { Config } from "jest";

const config: Config = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/*.spec.ts"],
  moduleFileExtensions: ["ts", "js", "json"],
  roots: ["<rootDir>/src"],
  transform: {
    "^.+\\.ts$": "ts-jest"
  }
};

export default config;
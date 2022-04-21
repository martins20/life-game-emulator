const { resolve } = require("path");
const { pathsToModuleNameMapper } = require("ts-jest");

const { compilerOptions } = require("./tsconfig.json");

module.exports = {
    bail: true,
    clearMocks: true,
    collectCoverage: true,
    collectCoverageFrom: [
        "<rootDir>/src/**/*.ts",
        "!<rootDir>/src/**/dtos/*",
        "!<rootDir>/src/**/repositories/**",
        "!<rootDir>/src/**/entities/**",
        "!<rootDir>/src/**/test/**",
        "!<rootDir>/src/**/containers/**",
        "!<rootDir>/src/shared/index.ts",
        "!<rootDir>/src/shared/Server.ts",
    ],
    coverageDirectory: "coverage",
    coveragePathIgnorePatterns: ["/node_modules/"],
    coverageProvider: "v8",
    coverageReporters: ["text-summary", "lcov"],
    moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
        prefix: "<rootDir>/src/",
    }),
    preset: "ts-jest",
    rootDir: resolve(__dirname),
    setupFilesAfterEnv: ["<rootDir>/src/config/test/config.ts"],
    testMatch: ["**/*.spec.ts"],
};

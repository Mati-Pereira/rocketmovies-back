module.exports = {
  bail: true,
  modulePathIgnorePatterns: ["<rootDir>/dist/", "<rootDir>/node_modules/"],
  coverageProvider: "v8",
  testMatch: ["<rootDir>/**/*.spec.js"],
  transform: { "\\.(js)$": "@sucrase/jest-plugin" },
};

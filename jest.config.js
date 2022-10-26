module.exports = {
  bail: true,
  coverageProvider: "v8",
  testMatch: ["<rootDir>/**/*.spec.js"],
  transform: { "\\.(js)$": "@sucrase/jest-plugin" },
};

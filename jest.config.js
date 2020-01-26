module.exports = {
  "transform": {
    "^.+\\.ts?$": "ts-jest"
  },
  "testRegex": "\\.(spec|test)\\.ts?$",
  "moduleFileExtensions": ["js", "ts"],
  "modulePaths": ["<rootDir>/src/"],
  "testEnvironment": "node",
  "forceExit": true,
  "testPathIgnorePatterns": [".recli"]
};

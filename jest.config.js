const moduleNameMapper =  {
  "^@Components": "<rootDir>/src/Components",
  "^@Components/(.*)$": "<rootDir>/src/Components/$1",
  "^@Containers": "<rootDir>/src/Containers",
  "^@Containers/(.*)$": "<rootDir>/src/Containers/$1",
  "^@Interfaces": "<rootDir>/src/Interfaces",
  "^@Interfaces/(.*)$": "<rootDir>/src/Interfaces/$1",
  "^@Config": "<rootDir>/src/Config",
  "^@Constants": "<rootDir>/src/Constants",
  "^@Constants/(.*)$": "<rootDir>/src/Constants/$1",
  "^@Reducers": "<rootDir>/src/Reducers",
  "^@Reducers/(.*)$": "<rootDir>/src/Reducers/$1",
  "^@Store": "<rootDir>/src/Store",
  "^@Store/(.*)$": "<rootDir>/src/Store/$1",
  "^@Utilities": "<rootDir>/src/Utilities",
  "^@Utilities/(.*)$": "<rootDir>/src/Utilities/$1",
}

module.exports = {
  moduleFileExtensions: [
    "ts",
    "tsx",
    "js",
    "json"
  ],
  automock: false,
  setupFiles: [
    "./jest.setup.ts"
  ],
  setupFilesAfterEnv: [
    "./setupJest.ts"
  ],
  moduleNameMapper,
  moduleDirectories: [
    ".",
    "src",
    "node_modules"
  ],
  transform: {
    "^.+\\.tsx?$": "babel-jest"
  },
  testMatch: [
    "**/*.(test|spec).(ts|tsx)"
  ],
  globals: {
    "ts-jest": {
      useBabelrc: false,
      tsConfigFile: "tsconfig.json"
    }
  },
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "enzyme.js"
  ],
  coverageReporters: [
    "json",
    "lcov",
    "text",
    "text-summary"
  ]
};

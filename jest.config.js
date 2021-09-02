module.exports = {
    "preset" : "jest-preset-angular",
    "setupFilesAfterEnv" : [
        "<rootDir>/setupjest.ts"
    ],
    "transform" :  {
        "^.+\\.(ts|js|html)$": "ts-jest"
    },
    "testPathIgnorePatterns": [
        "<rootDir>/node+",
        "<rootDir>/setupjest.ts",
        "<rootDir>/setupjest.ts",
        "<rootDir>/setupjest.ts",
    ]
  };
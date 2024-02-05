export default {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.tsx?$": "ts-jest",
    // process `*.tsx` files with `ts-jest`
  },
  rootDir: "src",
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$":
      "<rootDir>/test/__ mocks __/fileMock.js",
    "\\.(css|less)$": "<rootDir>/test/__ mocks __/styleMock.js",
  },
  setupFilesAfterEnv: ["@testing-library/jest-dom", "./jest.setup.ts"],
};

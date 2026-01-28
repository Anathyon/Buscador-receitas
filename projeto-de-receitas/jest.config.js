export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/__mocks__/styleMock.js',
    '\\.(gif|ttf|eot|svg|png)$': '<rootDir>/__mocks__/fileMock.js',
  },
  transform: {
    '^.+\\.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json'
    }]
  },
  transformIgnorePatterns: [
    'node_modules/(?!(react-intl|@formatjs)/)',
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'RecipeModal.test.tsx',
    'App.test.tsx'
  ],
};

module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@types/(.*)$': '<rootDir>/src/types/$1',  // Tambahkan mapping path alias
  },
};
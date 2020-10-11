module.exports = {
  testRegex: 'tests/.*.spec.js$',
  coveragePathIgnorePatterns: ['/node_modules/', 'tests'],
  verbose: true,
  silent: false,
  moduleFileExtensions: [
    'js',
  ],
  transform: {
    '^.+\.js$': '<rootDir>/node_modules/babel-jest',
  },
}

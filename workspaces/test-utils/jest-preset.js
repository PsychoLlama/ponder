/* eslint-env node */
// @flow
module.exports = {
  setupTestFrameworkScriptFile: require.resolve('./configure-jest.js'),
  moduleNameMapper: {
    '\\.css$': require.resolve('./css-stub.js'),
  },
};

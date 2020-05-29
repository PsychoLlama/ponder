/* eslint-env node */
module.exports = {
  setupTestFrameworkScriptFile: require.resolve('./configure-jest.js'),
  moduleNameMapper: {
    '\\.css$': require.resolve('./css-stub.js'),
  },
};

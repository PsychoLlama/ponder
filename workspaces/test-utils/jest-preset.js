/* eslint-env node */
// @flow
const path = require('path');

module.exports = {
  setupTestFrameworkScriptFile: path.join(__dirname, 'configure-jest.js'),
};

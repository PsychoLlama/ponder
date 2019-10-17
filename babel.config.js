/* eslint-env node */
module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      require('@freighter/scripts/babel-preset'),
      require('@babel/preset-react'),
      require('@babel/preset-flow'),
    ],
    plugins: [
      require('@babel/plugin-proposal-class-properties'),
      require('@babel/plugin-syntax-dynamic-import'),
      require('babel-plugin-styled-components'),
    ],
  };
};

/* eslint-disable flowtype/require-valid-file-annotation */
/* eslint-env node */
module.exports = function(api) {
  api.cache(true);

  return {
    presets: [
      require('@freighter/scripts/babel-preset'),
      require('@babel/preset-react'),
    ],
    plugins: [
      require('@babel/plugin-proposal-class-properties'),
      require('babel-plugin-emotion'),
    ],
  };
};

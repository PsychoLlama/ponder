// @flow
const path = require('path');

// eslint-disable-next-line no-process-env
const { NODE_ENV } = process.env;
const mode = NODE_ENV === 'production' ? 'production' : 'development';

module.exports = {
  mode,
  entry: {
    app: path.join(__dirname, 'src/index.js'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
  },
  target: 'electron-renderer',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            extends: require.resolve('../../babel.config'),
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
};

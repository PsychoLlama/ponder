const path = require('path');

const isProduction = process.env.NODE_ENV === 'production';
const mode = isProduction ? 'production' : 'development';

const babelLoader = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: {
    loader: 'babel-loader',
    options: {
      extends: require.resolve('../../babel.config'),
    },
  },
};

const typescriptLoader = {
  test: /\.tsx?$/,
  exclude: /node_modules/,
  use: [{ loader: 'ts-loader' }],
};

const cssLoader = {
  test: /\.css$/,
  use: ['style-loader', 'css-loader'],
};

const resolveOptions = {
  extensions: ['.ts', '.tsx', '.js'],
};

module.exports = [
  {
    mode,
    devtool: isProduction ? undefined : 'inline-cheap-module-source-map',
    entry: path.join(__dirname, 'src/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'app.bundle.js',
    },
    target: 'electron-renderer',
    module: {
      rules: [typescriptLoader, babelLoader, cssLoader],
    },
    resolve: resolveOptions,
  },

  {
    mode,
    entry: path.join(__dirname, 'main-process/index.tsx'),
    output: {
      path: path.resolve(__dirname, 'dist/'),
      filename: 'main-process.bundle.js',
    },
    target: 'electron-main',
    node: {
      __filename: false,
      __dirname: false,
    },
    module: {
      rules: [typescriptLoader, babelLoader],
    },
    resolve: resolveOptions,
  },
];

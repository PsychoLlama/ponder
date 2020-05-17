module.exports = {
  stories: ['../src/stories/**/*.stories.ts{x,}'],
  webpackFinal: (config) => {
    config.module.rules.push({
      test: /\.tsx?$/,
      exclude: /node_modules/,
      use: { loader: require.resolve('ts-loader') },
    });

    config.resolve.extensions.push('.ts', '.tsx');

    return config;
  },
};

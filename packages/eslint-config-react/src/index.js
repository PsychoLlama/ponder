const { version: reactVersion } = require('react/package');

module.exports = {
  env: {
    browser: true,
    node: true,
  },

  // HACK: this assumes the plugin is hoisted and visible to ESLint.
  // Can be cleanly implemented after eslint/issues/10125.
  plugins: ['react'],
  extends: ['plugin:react/recommended'],

  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
  },

  settings: {
    react: {
      version: reactVersion,
    },
  },
};

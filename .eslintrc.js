module.exports = {
  parserOptions: {
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  extends: 'airbnb',
  env: {
    'jest/globals': true,
    browser: true,
    node: true
  },
  rules: {
    'semi': 2,
    'arrow-parens': ['off'],
    'compat/compat': 'error',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'func-names': 'off',
    'generator-star-spacing': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/no-unresolved': 'error', // # hack until resolving import properly
    'import/extensions': 'error', // # hack until resolving import properly
    'import/no-extraneous-dependencies': 'off',
    'linebreak-style': 'off',
    'no-console': 'off',
    'no-underscore-dangle': "off",
    'no-use-before-define': 'off',
    'no-multi-assign': 'off',
    'no-plusplus': 'off',
    'no-param-reassign': 'off',
    'no-loop-func': 'off',
    'promise/param-names': 'error',
    'promise/always-return': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/always-return': 'off'
  },
  plugins: ['jest', 'promise', 'import', 'compat'],
};

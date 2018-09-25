module.exports = {
  parser: 'babel-eslint',
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
    'compat/compat': 'warn',
    'array-bracket-spacing': 0,
    'arrow-parens': ['off'],
    'compat/compat': 'error',
    'comma-dangle': 'off',
    'consistent-return': 'off',
    'generator-star-spacing': 'off',
    'import/order': ['error', { 'newlines-between': 'always' }],
    'import/no-unresolved': 'error', // # hack until resolving import properly
    'import/extensions': 'error', // # hack until resolving import properly
    'import/no-extraneous-dependencies': 'off',
    'import/prefer-default-export': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'jsx-a11y/label-has-for': 0,
    'jsx-a11y/no-autofocus': 0,
    'linebreak-style': 'off',
    'object-curly-newline': 'off',
    'no-console': 'off',
    'no-underscore-dangle': "off",
    'no-use-before-define': 'off',
    'no-multi-assign': 'off',
    'no-plusplus': 'off',
    'no-loop-func': 'off',
    'no-param-reassign': 'off',
    'promise/param-names': 'error',
    'promise/always-return': 'error',
    'promise/catch-or-return': 'error',
    'promise/no-native': 'off',
    'promise/always-return': 'off',
    'react/no-array-index-key': 0,
    'react/sort-comp': [
      'error',
      {
        order: [
          'type-annotations',
          'static-methods',
          'lifecycle',
          'everything-else',
          'render'
        ]
      }
    ],
    'react/jsx-no-bind': 'off',
    'react/jsx-one-expression-per-line': 'off',
    'react/jsx-filename-extension': ['error', { extensions: ['.js', '.jsx'] }],
    'react/prefer-stateless-function': 'off',
    'react/destructuring-assignment': 'off'
  },
  plugins: ['jest', 'promise', 'import', 'react', 'compat'],
};

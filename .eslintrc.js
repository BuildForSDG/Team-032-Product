const platform = require('os').platform();

module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
    jest: true
  },
  extends: ['airbnb-base'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  rules: {
    'comma-dangle': ['error', 'never'],
    'linebreak-style': ['error', platform === 'linux' ? 'unix' : 'windows'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'no-restricted-globals': 0,
    'consistent-return': 0,
  }
};

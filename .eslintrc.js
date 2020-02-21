module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  plugins: [
    'prettier',
  ],
  extends: [
    'airbnb-base',
    'prettier'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'class-methods-use-this': 'off',
    'no-param-reassign': 'off',
    camelCase: 'off',
    'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
  },
};

module.exports = {
  extends: 'plugin:@typescript-eslint/recommended',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
  },
  env: {
    jest: true,
  },
  rules: {
    '@typescript-eslint/explicit-module-boundary-types': 0,
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'always-multiline',
    }],
    semi: ['error', 'always'],
    quotes: ['error', 'single'],
  },
};

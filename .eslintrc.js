module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
  ],
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'off',
    'import/no-extraneous-dependencies': 'off',
    'import/extensions': 'off',
    'import/no-unresolved': 'off',
    'import/prefer-default-export': 'off',
    'prefer-promise-reject-errors': 'off',
    '@typescript-eslint/no-var-requires': 'off',
  },
};

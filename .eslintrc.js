module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['plugin:vue/vue3-essential', '@vue/airbnb', '@vue/typescript/recommended', 'prettier'],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-param-reassign': 'off',
    'no-restricted-syntax': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-continue': 'off',
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['~', './src'],
          ['~data', './data'],
        ],
        extensions: ['.js', '.ts', '.vue'],
      },
    },
  },
};

module.exports = {
  extends: ['airbnb', 'prettier', 'prettier/react'],
  plugins: ['prettier', 'react'],
  rules: {
    'comma-dangle': ['warn', 'never'],
    indent: ['warn', 2],
    'linebreak-style': ['warn', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'always'],
    'no-unused-expressions': 'warn',
    'no-useless-concat': 'warn',
    'block-scoped-var': 'error',
    'consistent-return': 'error'
  },
  settings: {
    'import/resolver': 'node'
  }
};

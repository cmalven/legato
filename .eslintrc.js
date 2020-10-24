module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module',
  },
  env: {
    es6: true,
    browser: true,
  },
  plugins: [
    'svelte3',
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3',
    },
  ],
  rules: {
    'array-bracket-spacing': ['error', 'never'],
    'block-spacing': ['error', 'always'],
    'brace-style': ['error', '1tbs', { 'allowSingleLine': true }],
    'camelcase': 'warn',
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'comma-dangle': ['error', 'always-multiline'],
    'eqeqeq': 'error',
    'handle-callback-err': ['error', 'er'],
    'func-call-spacing': ['error', 'never'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'arrow-spacing': ['error', { 'before': true, 'after': true }],
    'key-spacing': ['error', { 'beforeColon': false, 'afterColon': true }],
    'lines-between-class-members': ['error', 'always', { 'exceptAfterSingleLine': true }],
    'max-nested-callbacks': ['error', 3],
    'no-console': 'off',
    'no-mixed-spaces-and-tabs': ['error'],
    'no-multi-spaces': 'error',
    'no-spaced-func': ['error'],
    'no-unneeded-ternary': ['error'],
    'no-unused-vars': ['error', { 'vars': 'local', 'args': 'none' }],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single', { 'avoidEscape': true, 'allowTemplateLiterals': true }],
    'space-before-function-paren': ['error', 'never'],
    'space-before-blocks': ['error', 'always'],
    'space-in-parens': ['error', 'never'],
    'semi': ['error', 'always'],
    'strict': 'off',
    'new-cap': 'error',
    'no-undef': 'off',
    'no-bitwise': ['error', { 'allow': ['~'] }],
  },
  settings: {
    // ...
  },
};
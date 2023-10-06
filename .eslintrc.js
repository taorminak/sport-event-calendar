module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
  plugins: ['@typescript-eslint', 'vue', 'prettier'],
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: [2, 'always'],
    'max-len': ['error', { code: 120, ignorePattern: '^import\\s.+\\sfrom\\s.+;$' }],
    'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
    quotes: ['error', 'single', { allowTemplateLiterals: true, avoidEscape: true }],
    'import/extensions': 'off',
    'prettier/prettier': 'error',
    'import/prefer-default-export': 'off',
    'max-lines-per-function': ['error', 40],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['if', 'for', 'while', 'switch'],
      },
      { blankLine: 'always', prev: '*', next: 'return' },
      { blankLine: 'always', prev: ['const', 'let'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['const', 'let'] },
      {
        blankLine: 'any',
        prev: ['const', 'let'],
        next: ['export', 'const', 'let'],
      },
    ],
    'vue/no-multiple-template-root': 'off',
  },
  overrides: [
    {
      files: ['**/__tests__/*.{j,t}s?(x)', '**/tests/unit/**/*.spec.{j,t}s?(x)', '**/*.d.ts', 'src/shims-vue.d.ts'],
      rules: {
        'import/no-extraneous-dependencies': 'off',
      },
      env: {
        jest: true,
      },
    },
  ],
};

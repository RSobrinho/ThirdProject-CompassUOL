module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['standard', 'plugin:@typescript-eslint/recommended'],
  // extends: ['standard', 'plugin:prettier/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.spec.ts'],
      rules: {
        'no-useless-constructor': 'off',
      },
    },
  ],
  // rules: {
  //   'prettier/prettier': [
  //     'error',
  //     {
  //       printWidth: 80,
  //       tabWidth: 2,
  //       singleQuote: true,
  //       trailingComma: 'all',
  //       arrowParens: 'always',
  //       semi: false,
  //     },
  //   ],
  // },
  settings: {
    'import/parsers': {
      [require.resolve('@typescript-eslint/parser')]: ['.ts', '.tsx', '.d.ts'],
    },
  },
}

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb',
    'airbnb-typescript',
    'airbnb/hooks',
    'plugin:prettier/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 15,
    sourceType: 'module',
    project: './tsconfig.app.json',
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  ignorePatterns: ['vite.config.ts'],
  rules: {
    'react/react-in-jsx-scope': 0,
    'no-console': 'off',
    'import/no-cycle': 'off',
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'always',
        tsx: 'always',
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: ['state'],
      },
    ],
    'max-lines-per-function': ['error', 40],
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: false,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: './',
      },
    ],
  },
  overrides: [
    {
      files: [
        'src/app/**/*.ts',
        'src/app/**/*.tsx',
        'src/features/**/*.tsx',
        'src/UI/**/*.tsx',
      ],
      rules: {
        'max-lines-per-function': 'off',
      },
    },
  ],
};

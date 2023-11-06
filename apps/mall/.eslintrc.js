module.exports = {
  root: true,
  extends: ['@modern-js'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  rules: {
    'consistent-return': 'off',
    'no-unused-vars': 'off',
  },
};

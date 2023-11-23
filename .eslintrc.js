module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: 'standard',
  overrides: [
    {
      env: {
        node: true,
        mocha: true
      },
      files: [
        '.eslintrc.{js,cjs}'
      ],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  globals: {
    describe: 'readonly',
    it: 'readonly',
    before: 'readonly',
    beforeEach: 'readonly',
    after: 'readonly',
    afterEach: 'readonly'
  },
  rules: {
  }
}

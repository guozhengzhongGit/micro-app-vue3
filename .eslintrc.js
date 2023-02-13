const { getWords, getGlobalWords } = require('modules-words');

module.exports = {
  root: true,
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended', // eslint推荐的eslint规范
    'plugin:vue/vue3-recommended', // vue3的推荐配置
    '@vue/prettier' // eslint-config-vue
  ],
  parserOptions: {
    parser: '@babel/eslint-parser'
  },
  plugins: ['spellcheck'],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-undef': 'error',
    'no-unused-vars': 'error',
    'vue/no-unused-components': 'error',
    'vue/multi-word-component-names': 'warn',
    // 强制花括号内换行符的一致性
    'object-curly-newline': 'error',
    'prettier/prettier': ['error', { singleQuote: true }],
    'spellcheck/spell-checker': [
      'warn',
      {
        skipWords: [...getWords('vue'), ...getGlobalWords()]
      }
    ]
  }
};

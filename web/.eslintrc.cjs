/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    project: ['tsconfig.json'], // 
    // project: ['tsconfig.json', 'tsconfig.app.json', 'tsconfig.node.json', '@types/node'], // 
    sourceType: 'module',
    tsconfigRootDir: __dirname,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting',
    // 'eslint-config-tencent/prettier',
  ],
  overrides: [
    {
      parser: 'vue-eslint-parser', // .vue文件正确校验的必要配置
      files: ['*.ts', '*.tsx', '*.vue'],
      extends: ['eslint-config-tencent', 'eslint-config-tencent/ts'],
    },
  ],
  rules: {    
    /* 去除一些 @vue/eslint-config-typescript包附带的非必要规则  */
    'vue/multi-word-component-names': 0, // 组件 文件名或者名称 最少需要两个驼峰单词
  }
};

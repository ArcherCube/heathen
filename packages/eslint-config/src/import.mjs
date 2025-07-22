import importPlugin from 'eslint-plugin-import';
import { defineConfig } from 'eslint/config';

export const importConfig = defineConfig([
  importPlugin.flatConfigs.recommended,
  // import 的一些不兼容规则
  {
    rules: {
      'import/named': 'off',
      'import/namespace': 'off',
      'import/default': 'off',
      'import/no-named-as-default-member': 'off',
      'import/no-unresolved': 'off',
      'import/no-named-as-default': 'off',
    },
  },
]);

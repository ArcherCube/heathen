import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import { defineConfig } from 'eslint/config';

export const prettierConfig = defineConfig([
  eslintPluginPrettierRecommended,
  {
    rules: {
      'prettier/prettier': [
        'error',
        {
          endOfLine: 'auto',
          trailingComma: 'all',
          semi: true,
          singleQuote: true,
          printWidth: 120,
          arrowParens: 'always',
          jsxSingleQuote: true,
        },
      ],
    },
  },
]);

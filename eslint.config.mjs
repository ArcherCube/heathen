// @ts-check

import { config } from '@heathen/eslint-config';
import { defineConfig } from 'eslint/config';
import { includeIgnoreFile } from '@eslint/compat';
import path from 'node:path';

export default defineConfig(
  includeIgnoreFile(path.resolve(import.meta.dirname, '.gitignore')),
  { files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'] },
  config,
);

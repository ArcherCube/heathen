// @ts-check

import { includeIgnoreFile } from '@eslint/compat';
import { config } from '@heathen/eslint-config';
import pluginQuery from '@tanstack/eslint-plugin-query';
import pluginRouter from '@tanstack/eslint-plugin-router';
import { defineConfig } from 'eslint/config';
import path from 'node:path';

export default defineConfig(
  includeIgnoreFile(path.resolve(import.meta.dirname, '.gitignore')),
  { files: ['**/*.{js,jsx,mjs,cjs,ts,tsx}'] },
  config,
  pluginRouter.configs['flat/recommended'],
  pluginQuery.configs['flat/recommended'],
);

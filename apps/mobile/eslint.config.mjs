import playwright from 'eslint-plugin-playwright';
import nx from '@nx/eslint-plugin';
import baseConfig from '../../../eslint.config.mjs';

export default [
  ...baseConfig,
  ...nx.configs['flat/react'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
  },
  {
    ignores: ['public', '.cache', 'node_modules'],
  },
  {
    files: ['**/*.spec.ts', '**/*.spec.tsx', '**/*.e2e.ts', '**/*.e2e.tsx'],
    ...playwright.configs['flat/recommended'],
  },
];

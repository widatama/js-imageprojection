import { defineConfig } from 'oxlint';
import stylistic from '@stylistic/eslint-plugin';

const stylisticConfigJS = stylistic.configs.customize({ jsx: false, ts: false, semi: true });
const stylisticConfigTS = stylistic.configs.customize({ jsx: false, semi: true });

export default defineConfig({
  env: {
    node: true,
  },
  jsPlugins: ['@stylistic/eslint-plugin'],
  rules: {
    ...stylisticConfigJS.rules,
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.cts', '**/*.mts'],
      rules: {
        ...stylisticConfigTS.rules,
      },
    },
  ],
  ignorePatterns: ['dist/', 'node_modules/', '.git/'],
});

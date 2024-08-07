const fs = require('fs');
const path = require('path');

const { includeIgnoreFile } = require('@eslint/compat');
const eslintJS = require('@eslint/js');
const stylistic = require('@stylistic/eslint-plugin');
const globals = require('globals');
const eslintTS = require('typescript-eslint');

const gitignoreFilePath = path.resolve(__dirname, '.gitignore');

// styling related rules, so code formatter is not needed
const eslintStyleJS = stylistic.configs.customize({ jsx: false, ts: false, semi: true });
const eslintStyleTS = stylistic.configs.customize({ jsx: false, semi: true });

const pluginsJS = { ...eslintStyleJS.plugins };
const pluginsTS = {
  '@typescript-eslint': eslintTS.plugin,
  ...eslintStyleJS.plugins,
  ...eslintStyleTS.plugins,
};
const rulesJS = { ...eslintJS.configs.recommended.rules, ...eslintStyleJS.rules };
const rulesTS = {
  ...eslintJS.configs.recommended.rules,
  ...eslintStyleJS.rules,
  ...eslintTS.configs.recommended[1].rules,
  ...eslintTS.configs.recommended[2].rules,
  ...eslintStyleTS.rules,
};

module.exports = [
  {
    // for config files
    files: ['**/*.{conf|config}.{ts|cjs}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'commonjs',
      globals: { ...globals.node },
    },
    plugins: pluginsJS,
    rules: rulesJS,
  },
  {
    // for typescript files
    files: ['**/*.ts', '**/*.cts', '**/*.mts'],
    ignores: ['**/*.{conf|config}.*'],
    languageOptions: {
      ecmaVersion: 'latest',
      parser: eslintTS.parser,
      parserOptions: {
        projectService: true,
      },
      sourceType: 'module',
    },
    plugins: pluginsTS,
    rules: rulesTS,
  },
  // ignore everything inside .gitignore
  fs.existsSync(gitignoreFilePath) ? includeIgnoreFile(gitignoreFilePath) : {},
];

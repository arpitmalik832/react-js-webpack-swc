/**
 * ESLint configuration for the library.
 * @file This file is saved as `eslint.config.js`.
 */
import babelParser from '@babel/eslint-parser';
import mdxParser from 'eslint-mdx';
import globals from 'globals';
import * as mdxPlugin from 'eslint-plugin-mdx';
import path from 'path';
import { fileURLToPath } from 'url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import importPlugin from 'eslint-plugin-import';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import storybookPlugin from 'eslint-plugin-storybook';
import jestPlugin from 'eslint-plugin-jest';
import cypressPlugin from 'eslint-plugin-cypress/flat';
import jsdoc from 'eslint-plugin-jsdoc';

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);
const compat = new FlatCompat({
  baseDirectory: dirname,
});

const jsFiles = ['**/*.?(c|m)js?(x)'];
const storiesFiles = ['**/*.stories.?(c|m)js?(x)'];
const mdFiles = ['**/*.md?(x)'];
const jestFiles = ['**/*/__tests__/**/*.@(t|j)s?(x)'];
const e2eFiles = ['**/*.@(cy).@(t|j)s?(x)'];

export default [
  {
    ignores: [
      'node_modules/*',
      'dist/*',
      'build/*',
      'coverage/*',
      'cypress/fixtures',
      'cypress/downloads',
      'cypress/videos',
      'cypress/screenshots',
      'storybook-static',
      '**/*.md',
      'distInfo/*',
    ],
  },
  {
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        NodeJS: true,
        BlobPart: true,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: 2,
    },
  },
  ...compat.config({
    extends: ['airbnb', 'plugin:css-modules/recommended', 'prettier'],
    plugins: ['css-modules', 'prettier'],
    rules: {
      'css-modules/no-unused-class': [
        2,
        {
          camelCase: true,
        },
      ],
      'css-modules/no-undef-class': [
        2,
        {
          camelCase: true,
        },
      ],
      'prettier/prettier': [
        1,
        {
          endOfLine: 'lf',
        },
      ],
    },
  }),
  {
    files: [...jsFiles, ...mdFiles],
    ...js.configs.recommended,
    ...importPlugin.flatConfigs.recommended,
    ...jsxA11yPlugin.flatConfigs.strict,
    ...reactPlugin.configs.flat.all,
    ...reactPlugin.configs.flat['jsx-runtime'],
    ...reactHooksPlugin.configs.recommended,
    plugins: {
      import: importPlugin,
      'jsx-a11y': jsxA11yPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
    },
    rules: {
      'react/react-in-jsx-scope': 0,
      'react/function-component-definition': 0,
      'react/prop-types': 0,
      'react/jsx-filename-extension': [
        0,
        {
          extensions: ['.tsx'],
        },
      ],
      'react/require-default-props': 0,
      'react-hooks/rules-of-hooks': 2,
      'react-hooks/exhaustive-deps': 0,
      'import/no-extraneous-dependencies': [
        2,
        {
          packageDir: '.',
        },
      ],
      'import/prefer-default-export': 0,
      'import/extensions': [
        2,
        'ignorePackages',
        {
          js: 'never',
          jsx: 'never',
          ts: 'never',
          tsx: 'never',
        },
      ],
      'import/no-unresolved': [
        2,
        {
          ignore: [
            'typescript-eslint',
            '@arpitmalik832/react-ts-rollup-library/.*\\.css$',
            'react-dom/client',
            'eslint-plugin-cypress/flat',
          ],
        },
      ],
      'jsx-a11y/anchor-is-valid': 2,
      'no-console': 2,
      'no-debugger': 2,
      'no-unused-vars': 2,
      'prefer-destructuring': 2,
      'func-names': 2,
      camelcase: 1,
    },
  },

  {
    files: jestFiles,
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      },
    },
  },
  {
    files: e2eFiles,
    ...cypressPlugin.configs.recommended,
  },
  ...storybookPlugin.configs['flat/recommended'],
  {
    files: jsFiles,
    ...jsdoc.configs['flat/recommended'],
    plugins: {
      jsdoc,
    },
    rules: {
      // rules regarding jsdoc
      'jsdoc/check-types': 2,
      'jsdoc/check-values': 2,
      'jsdoc/check-syntax': 2,
      'jsdoc/check-alignment': 2,
      'jsdoc/check-tag-names': 2,
      'jsdoc/check-indentation': 1,
      'jsdoc/check-param-names': 2,
      'jsdoc/check-property-names': 2,
      'jsdoc/check-line-alignment': 2,
      'jsdoc/require-jsdoc': 2,
      'jsdoc/require-param': 2,
      'jsdoc/require-throws': 2,
      'jsdoc/require-yields': 2,
      'jsdoc/require-returns': 2,
      'jsdoc/require-example': 2,
      'jsdoc/require-template': 2,
      'jsdoc/require-property': 2,
      'jsdoc/require-param-type': 2,
      'jsdoc/require-param-name': 2,
      'jsdoc/require-description': 2,
      'jsdoc/require-returns-type': 2,
      'jsdoc/require-yields-check': 2,
      'jsdoc/require-file-overview': 2,
      'jsdoc/require-returns-check': 2,
      'jsdoc/require-property-name': 2,
      'jsdoc/require-property-type': 2,
      'jsdoc/require-asterisk-prefix': 2,
      'jsdoc/require-param-description': 2,
      'jsdoc/require-returns-description': 2,
      'jsdoc/require-property-description': 2,
      'jsdoc/require-description-complete-sentence': 2,
      'jsdoc/require-hyphen-before-param-description': 2,
      'jsdoc/sort-tags': 2,
      'jsdoc/tag-lines': 2,
      'jsdoc/valid-types': 2,
    },
    languageOptions: {
      parser: babelParser,
      ecmaVersion: 6,
      parserOptions: {
        requireConfigFile: false,
        babelOptions: {
          presets: [
            [
              '@babel/preset-react',
              {
                runtime: 'automatic',
              },
            ],
            '@babel/preset-env',
          ],
        },
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx'],
        },
      },
    },
  },
  {
    ...mdxPlugin.flat,
    ...mdxPlugin.flatCodeBlocks,
    files: mdFiles,
    languageOptions: {
      parser: mdxParser,
      parserOptions: {
        extensions: [...mdFiles, ...jsFiles, ...storiesFiles],
        markdownExtensions: [...mdFiles, ...jsFiles, ...storiesFiles],
      },
    },
    settings: {
      'import/resolver': {
        node: {
          extensions: ['.js', '.jsx', '.ts', '.tsx'],
        },
      },
    },
    processor: mdxPlugin.createRemarkProcessor({
      lintCodeBlocks: true,
      languageMapper: {},
    }),
    rules: {
      ...mdxPlugin.flatCodeBlocks.rules,
      'no-var': 'error',
      'prefer-const': 'error',
    },
  },
];

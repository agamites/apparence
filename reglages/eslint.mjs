// Réglages ESLint communs aux deux briques d'Agamites (CONSIGNES.md, section 3).
// Usage, dans eslint.config.mjs de la brique :
//   import agamites from '@agamites/apparence/eslint';
//   export default [...agamites, { ignores: ['dist/'] }];
import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist/', 'node_modules/', 'coverage/'] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx,js,mjs}'],
    languageOptions: { globals: { ...globals.browser, ...globals.node } },
    plugins: { 'react-hooks': reactHooks },
    rules: {
      ...reactHooks.configs.recommended.rules,
      // Une variable inutilisée est une erreur, sauf celles qu'on écarte exprès avec un « _ » devant.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', ignoreRestSiblings: true },
      ],
      // Une promesse se traite ; « void » marque celles qu'on lance sans attendre, en le disant.
      'no-void': ['error', { allowAsStatement: true }],
      eqeqeq: ['error', 'always'],
      'prefer-const': 'error',
    },
  },
);

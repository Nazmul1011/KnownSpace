import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

// Layers: app → features → domain → shared. Cross-module imports go through each module's index.ts.
const throughIndex = { group: ['@/features/*/*', '@/domain/*/*'], message: "Import from the module's public entry (index.ts), not its internals." };
const layer = (forbidden, message) => ['error', { patterns: [throughIndex, { group: forbidden.flatMap((l) => [`@/${l}`, `@/${l}/*`]), message }] }];

export default tseslint.config(
  { ignores: ['dist', 'node_modules', 'public', 'qa-shots', 'art', 'scripts', 'tests', 'src/shared/ui/icons.generated.ts'] },
  {
    files: ['src/**/*.{ts,tsx}'],
    extends: [js.configs.recommended, ...tseslint.configs.recommended, reactHooks.configs.flat.recommended],
    languageOptions: { globals: globals.browser },
    rules: { 'no-restricted-imports': ['error', { patterns: [throughIndex] }] },
  },
  { files: ['src/features/**'], rules: { 'no-restricted-imports': layer(['app'], 'Features must not depend on the app layer.') } },
  { files: ['src/domain/**'], rules: { 'no-restricted-imports': layer(['app', 'features'], 'Domain modules must not depend on features or the app.') } },
  { files: ['src/shared/**'], rules: { 'no-restricted-imports': layer(['app', 'features', 'domain'], 'Shared modules must stay independent of the product.') } },
);

# vite-plugin-pretty-css-modules

Use prettier generated class names in development, while applying minification in production:

- **Development**: `${filename}-${selectorName}-${uniqueHash}` (e.g. `TodoList-root-3a92`)
- **Production**: `${uniqueHash}` (e.g. `c3a92`)

## Usage

```ts
// vite.config.ts
import prettyCssModules from 'vite-plugin-pretty-css-modules';

export default defineConfig({
  plugins: [prettyCssModules()]
});
```

## Configuration

```ts
import {Plugin} from 'vite';

declare function prettyCssModules(opts?: {
  /** Defaults to `shake256` (see https://nodejs.org/api/crypto.html#cryptocreatehashalgorithm-options) */
  algorithm: string;
  /** In bytes, defaults to `2` (which equals 65,536 unique strings) */
  outputLength: number;
}): Plugin;
```

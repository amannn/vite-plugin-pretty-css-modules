# vite-plugin-pretty-css-modules

Use pretty generated class names in development, while applying minification in production:

- **Development**: `${filename}-${selectorName}-${shortUniqueHash}` (e.g. `TodoList-root-3a92`)
- **Production**: `c${shortUniqueHash}` (e.g. `c3a92`)

## Usage

```ts
// vite.config.ts
import {defineConfig} from 'vite';
import prettyCssModules from 'vite-plugin-pretty-css-modules';

export default defineConfig({
  plugins: [prettyCssModules()]
});
```

## Configuration

The hash is generated with [the `crypto` module](https://nodejs.org/api/crypto.html) based on the file path and can be configured as follows:

```ts
declare function prettyCssModules(opts?: {
  /** Defaults to `shake256` (see https://nodejs.org/api/crypto.html#cryptocreatehashalgorithm-options) */
  algorithm: string;
  /** In bytes, defaults to `2` (which equals 65,536 unique strings) */
  outputLength: number;
});
```

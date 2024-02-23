import crypto from 'crypto';
import {Plugin} from 'vite';

export default function prettyCssModulesCssModules(opts?: {
  /** Defaults to `shake256`, see https://nodejs.org/api/crypto.html#cryptocreatehashalgorithm-options. */
  algorithm: string;
  /** In bytes, defaults to `2` which equals 65,536 unique strings. */
  outputLength: number;
}): Plugin {
  const algorithm = opts?.algorithm ?? 'shake256';
  const outputLength = opts?.outputLength ?? 2;

  function getCipher() {
    return crypto.createHash(algorithm, {outputLength});
  }

  return {
    name: 'optimized-css-modules',
    config(config, env) {
      config.css ??= {};

      if (env.mode === 'development') {
        config.css.modules = {
          ...config.css.modules,
          generateScopedName(name, path) {
            const hash = getCipher().update(path).digest('hex');
            const filenameParts = path.split('/').at(-1)?.split('.');
            if (!filenameParts) {
              throw new Error('Unexpected filename: ' + path);
            }

            if (filenameParts.at(-2) !== 'module') {
              throw new Error(
                'Expected filename to include ".module" before the file extension. Path: ' +
                  path
              );
            }

            const filename = filenameParts.at(-3);
            return filename + '-' + name + '-' + hash;
          }
        };
      } else {
        config.css.modules = {
          ...config.css.modules,
          generateScopedName(name, path) {
            const key = [path, name].join('-');
            const hash = getCipher().update(key).digest('hex');
            // Ensure result starts with a letter
            return 'c' + hash;
          }
        };
      }
    }
  };
}

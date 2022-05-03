import path from 'path';

import typescript from '@rollup/plugin-typescript';
import alias from '@rollup/plugin-alias';
import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    // sourcemap: true,
  },
  plugins: [
    alias({
      entries: {
        '@utils': path.resolve(__dirname, 'src/utils'),
      },
    }),
    common(),
    resolve(),
    typescript({ tsconfig: './tsconfig.json' }),
  ],
};

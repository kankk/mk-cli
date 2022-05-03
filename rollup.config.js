import typescript from '@rollup/plugin-typescript';
import common from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';

export default {
  input: 'src/index.ts',
  output: {
    file: 'dist/index.js',
    format: 'cjs',
    // sourcemap: true,
  },
  plugins: [common(), resolve(), typescript({ tsconfig: './tsconfig.json' })],
};

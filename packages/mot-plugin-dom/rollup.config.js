import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve';
import dts from 'rollup-plugin-dts';
import {terser} from 'rollup-plugin-terser';
export default [
  {
    input: 'src/index.ts',
    plugins: [
      resolve(),
      typescript(),
      terser(),
    ],
    output: [
      {
        file: 'dist/index-ems.min.js',
        format: 'es',
      },
      {
        file: 'dist/index-iife.min.js',
        format: 'iife',
        name: 'MotDomRender',
      },
      {
        file: 'dist/index-umd.min.js',
        format: 'umd',
        name: 'mot-plugin-dom',
      },
    ],
  },
  {
    input: 'src/@types/index.d.ts',
    output: [{file: 'dist/index.d.ts', format: 'es'}],
    plugins: [dts()],
  },
];

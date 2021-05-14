import typescript from 'rollup-plugin-typescript2';
import resolve from 'rollup-plugin-node-resolve'
import dts from "rollup-plugin-dts"
import { terser } from "rollup-plugin-terser";
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
        file: 'dist/index.ems.js',
        format: 'es',
      },
      {
        file: 'dist/index.iife.js',
        format: 'iife',
      },
    ],
  },
  {
    input: 'src/@types/index.d.ts',
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  }
]
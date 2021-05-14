import typescript from '@rollup/plugin-typescript'
import resolve from 'rollup-plugin-node-resolve'
import dts from "rollup-plugin-dts"

export default [
  {
    input: 'src/index.ts',
    plugins: [resolve(), typescript({ lib: ["es5", "es6", "dom"], target: "es5" })],
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
    input: 'src/@types/index.ts',
    output: [{ file: "dist/index.d.ts", format: "es" }],
    plugins: [dts()],
  }
]
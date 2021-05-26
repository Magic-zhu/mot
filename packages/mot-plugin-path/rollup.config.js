import typescript from 'rollup-plugin-typescript2';
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: 'build/mot-plugin-path-iife.min.js',
      format: 'iife'
    },
    {
      file: 'build/mot-plugin-path-es.min.js',
      format: 'esm'
    }
  ],
  plugins: [
    typescript(),
    terser(),
  ],
},
// {
//   input: "./src/interface.d.ts",
//   output: [{ file: "build/interface.d.ts", format: "es" }],
//   plugins: [dts()],
// }
]


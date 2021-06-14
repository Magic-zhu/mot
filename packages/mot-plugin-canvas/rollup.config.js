import typescript from 'rollup-plugin-typescript2';
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: 'build/mot-plugin-apng-iife.min.js',
      format: 'iife'
    },
    {
      file: 'build/mot-plugin-apng-es.min.js',
      format: 'esm'
    }
  ],
  plugins: [
    typescript(),
    terser(),
  ],
},
{
  input: ["./src/@types/index.d.ts"],
  output: [{ file: "build/index.d.ts", format: "es" }],
  plugins: [dts()],
}
]


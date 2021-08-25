import typescript from 'rollup-plugin-typescript2';
import dts from "rollup-plugin-dts";
import { terser } from "rollup-plugin-terser";

export default [{
  input: 'src/index.ts',
  output: [
    {
      file: 'build/mot-plugin-apng-iife.min.js',
      format: 'iife',
      name:"APNG",
    },
    {
      file: 'build/mot-plugin-apng-es.min.js',
      format: 'esm'
    },
    {
      file: 'build/mot-plugin-apng-umd.min.js',
      format: 'umd',
      name:"mot-plugin-apng",
    }
  ],
  plugins: [
    typescript(),
    terser(),
  ],
},
{
  input: ["./src/interface.d.ts"],
  output: [{ file: "build/index.d.ts", format: "es" }],
  plugins: [dts()],
}
]


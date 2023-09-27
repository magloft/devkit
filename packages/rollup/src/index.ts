import commonjs from '@rollup/plugin-commonjs'
import json from '@rollup/plugin-json'
import resolve from '@rollup/plugin-node-resolve'
import terser from '@rollup/plugin-terser'
import typescript from '@rollup/plugin-typescript'
import { Plugin, RollupOptions } from 'rollup'
import external from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'

export { commonjs, external, json, resolve, terser, typescript }

export function rollup(input: string, output: string = 'build/index.js', plugins?: Plugin[]): RollupOptions {
  return {
    input,
    output: [{ file: output, format: 'esm', sourcemap: true, inlineDynamicImports: true }],
    plugins: plugins ?? [
      external(),
      resolve({ preferBuiltins: false }),
      commonjs(),
      json(),
      typescript(),
      terser(),
      postcss({ inject: false, extract: true })
    ]
  }
}

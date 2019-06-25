import commonjs from 'rollup-plugin-commonjs'
import uglify from 'rollup-plugin-uglify'
import resolve from 'rollup-plugin-node-resolve'
import external from 'rollup-plugin-peer-deps-external'
import babel from 'rollup-plugin-babel'
import json from 'rollup-plugin-json'
import postcss from 'rollup-plugin-postcss'
import pkg from './package.json'

const extensions = ['.js', '.jsx', '.ts', '.tsx']

const config = {
  input: './src/index.ts',
  // Specify here external modules which you don't want to include in your bundle (for instance: 'lodash', 'moment' etc.)
  external: ['react', 'react-dom', '@material-ui/core', '@material-ui/icons'],
  plugins: [
    // Allows node_modules resolution
    resolve({ extensions }),

    // Allow CSS imports
    postcss(),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs({
      include: /node_modules/,
    }),
    json(),
    // Compile TypeScript/JavaScript files
    babel({ extensions, include: ['src/**/*'], exclude: 'node_modules/**' }),
    external(),
  ],

  output: [
    {
      file: pkg.main,
      format: 'cjs',
      exports: 'named',
    },
    {
      file: pkg.module,
      format: 'es',
      exports: 'named',
    },
  ],
}

if (process.env.NODE_ENV === 'production') {
  config.plugins.push(uglify())
}

export default config

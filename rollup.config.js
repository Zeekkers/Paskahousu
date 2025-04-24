// rollup.config.js
export default {
    input: 'src/main.js', // lähtötiedosto
    output: {
      file: 'dist/bundle.js',
      format: 'iife', // 'iife' toimii hyvin selaimessa
      sourcemap: true
    }
  };
  
const sveltePreprocess = require('svelte-preprocess');

const preprocessOptions = {
  sourceMap: true, // "you would always want sourcemaps for the IDE" – dummdidumm
  defaults: {
    style: 'scss',
  },
  scss: {
    // prependData: `@import 'src/styles/_variables.scss';`,
  },
};

module.exports = {
  preprocess: sveltePreprocess(preprocessOptions),

  // Export this to allow rollup.config.js to inherit the same preprocess options.
  preprocessOptions,
};

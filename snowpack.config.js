module.exports = {
  mount: {
    public: '/',
    src: '/_dist_',
  },
  plugins: [
    ['@snowpack/plugin-svelte', {}],
    '@snowpack/plugin-dotenv',
    [
      '@snowpack/plugin-run-script',
      { cmd: 'svelte-check --output human', watch: '$1 --watch', output: 'stream' },
    ],
    [
      '@snowpack/plugin-webpack',
      {
        extendConfig: config => {
          /** Make any changes to webpack config here… */
          return config;
        },
      },
    ],
  ],
  install: [
    /* ... */
  ],
  installOptions: {
    /* ... */
  },
  devOptions: {
    port: 8090,
  },
  buildOptions: {
    /* ... */
  },
  proxy: {
    /* ... */
  },
  alias: {
    /* ... */
  },
};

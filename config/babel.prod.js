module.exports = {
  // Don't try to find .babelrc because we want to force this configuration.
  babelrc: false,
  presets: [
    // Latest stable ECMAScript features
    require.resolve("babel-preset-es2015"),
    // JSX, Flow
    require.resolve('babel-preset-react'),
    require.resolve("babel-preset-stage-2"),

  ],
  plugins: [
      // Polyfills the runtime needed for async/await and generators
    [require.resolve('babel-plugin-transform-runtime'), {
      helpers: false,
      polyfill: false,
      regenerator: true
    }]
  ]
};

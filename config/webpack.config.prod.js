var path = require('path');
var autoprefixer = require('autoprefixer');
var webpack = require('webpack');
var url = require('url');
var paths = require('./paths');
var env = require('./env');

// Assert this just to be safe.
// Development builds of React are slow and not intended for production.
if (env['process.env.NODE_ENV'] !== '"production"') {
  throw new Error('Production builds must have NODE_ENV=production.');
}

// This is the production configuration.
// It compiles slowly and is focused on producing a fast and minimal bundle.
// The development configuration is different and lives in a separate file.
module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',
  // In production, we only want to load the polyfills and the app code.
  entry: [
    require.resolve('./polyfills'),
  path.join(paths.appSrc, 'index'),
  //  path.join(paths.xlsx, 'xlsx')
  ],
  output: {
    // The build folder.
    path: paths.appBuild,
    filename: 'index.js',
    libraryTarget: 'umd',
    library: 'react-xlsx'
  },
  resolve: {
    // These are the reasonable defaults supported by the Node ecosystem.
    extensions: ['.js', '.json', '']
  },
  module: {
    // First, run the linter.
    // It's important to do this before Babel processes the JS.
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     loader: 'eslint',
    //     include: paths.appSrc
    //   }
    // ],
    loaders: [
      // Process JS with Babel.
      {
        test: /\.js$/,
        include: [paths.appSrc],
        loader: 'babel',
        query: require('./babel.prod')
      }

    ]
  },
  // Point ESLint to our predefined config.
  eslint: {
    // TODO: consider separate config for production,
    // e.g. to enable no-console and no-debugger only in production.
    configFile: 'eslint.js',
    useEslintrc: false
  },
  // We use PostCSS for autoprefixing only.
  postcss: function() {
    return [
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ]
      }),
    ];
  },
  plugins: [
    new webpack.IgnorePlugin(/cptable/),
    new webpack.IgnorePlugin(/\b(ods)\b/),
  new webpack.ContextReplacementPlugin(/buffer/, require('buffer')),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `env.js`.
    // It is absolutely essential that NODE_ENV was set to production here.
    // Otherwise React will be compiled in the very slow development mode.
    // new webpack.DefinePlugin(env),
    // This helps ensure the builds are consistent if source hasn't changed:
    new webpack.optimize.OccurrenceOrderPlugin(),
    // Try to dedupe duplicated modules, if any:
    new webpack.optimize.DedupePlugin(),
    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        screw_ie8: true, // React doesn't support IE8
        warnings: false
      },
      mangle: {
        screw_ie8: true
      },
      output: {
        comments: false,
        screw_ie8: true
      }
    })
  ],
  node: {
        fs: "empty",
        global: false
    },
    externals: [
        {  "./cptable": "var cptable",
          "./jszip": "jszip",
          'react': 'commonjs react',
           'react-dom' : 'commonjs react-dom'
          }

    ]
};

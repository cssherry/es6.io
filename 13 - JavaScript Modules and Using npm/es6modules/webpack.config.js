// Uses common js to require webpack module
const webpack = require('webpack')

// Create environment variable to differentiate between production and development environments
const nodeEnv = process.env.NODE_ENV || 'production';

module.exports = {
  devtool: 'source-map',
  entry: {
    // Where to start application
    filename: './app.js'
  },
  output: {
    // Where to put processed app
    filename: '_build/bundle.js'
  },
  module: {
    // Loader specifies how to handle files
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015-native-modules']
        }
      }
    ]
  },
  plugins: [
    // Uglify files
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false },
      output: { comments: false },
      sourceMap: true
    }),
    // Set environment
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(nodeEnv) }
    })
  ]
}

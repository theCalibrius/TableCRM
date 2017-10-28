const path = require('path');

module.exports = {
  entry: ['./src/main.js'],
  output: {
    filename: 'bundle/bundle.js',
    path: __dirname
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'react'],
          plugins: [
            'transform-decorators-legacy',
            'transform-object-rest-spread'
          ]
        }
      }
    ]
  },
  node: {
    fs: 'empty'
  }
};

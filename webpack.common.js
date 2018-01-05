const path = require('path');

module.exports = {
  entry: ['./client/src/main.js'],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'bundle')
  },
  module: {
    loaders: [
      {
        test: /.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'flow', 'react'],
          plugins: [
            'transform-decorators-legacy',
            'transform-object-rest-spread',
            'transform-class-properties'
          ]
        }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      handsontable: path.resolve(__dirname, 'node_modules/handsontable-pro')
    }
  },
  node: {
    fs: 'empty'
  }
};

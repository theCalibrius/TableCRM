const path = require('path');

module.exports = {
  entry: ['./client/src/main.js'],
  output: {
    path: path.resolve(__dirname, 'bundle'),
    filename: 'bundle.js'
  },
  module: {
    // rules and loaders are the same thing
    rules: [
      {
        use: 'babel-loader',
        exclude: /node_modules/,
        test: /.js$/,
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
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              url: false
            }
          }
        ],
        test: /\.css$/,
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

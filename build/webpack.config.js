const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    publicPath: ''
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('client')]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin()
  ]
}

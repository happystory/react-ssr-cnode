const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === 'development'

const config = merge(baseConfig, {
  mode: 'production',
  entry: {
    app: path.join(__dirname, '../client/app.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: path.join(__dirname, '../dist'),
    // 防止HMR路径错误
    publicPath: '/public/'
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../client/template.html'),
      // favicon: path.join(__dirname, '../favicon.ico')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})

if (isDev) {
  config.mode = 'development'
  config.devServer = {
    host: '0.0.0.0',
    port: 8888,
    contentBase: false,
    hot: true,
    overlay: {
      errors: true,
      warnings: false
    },
    // 因为output 中 publicPath 为 /public
    publicPath: '/public',
    historyApiFallback: {
      index: '/public/index.html'
    },
    proxy: {
      '/api': 'http://localhost:3333/'
    }
  }
}

module.exports = config

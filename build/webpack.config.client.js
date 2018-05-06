const path = require('path')
const webpack = require('webpack')
const HTMLWebpackPlugin = require('html-webpack-plugin')

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

const isDev = process.env.NODE_ENV === 'development'

const config  = {
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
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(js|jsx)$/,
        loader: 'eslint-loader',
        include: [resolve('client')],
        options: {
          formatter: require('eslint-friendly-formatter'),
          emitWarning: true
        }
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('client')]
      }
    ]
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: path.join(__dirname, '../client/template.html')
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
}

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
    }
  }
}

module.exports = config

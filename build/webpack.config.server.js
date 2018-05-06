const path = require('path')

function resolve(dir) {
  return path.join(__dirname, '../', dir)
}

module.exports = {
  // 编译为类 Node.js 环境可用（使用 Node.js require 加载 chunk）
  // 默认编译为类浏览器环境里可用
  // https://doc.webpack-china.org/configuration/target/#target
  target: 'node',
  mode: 'development',
  entry: {
    app: path.join(__dirname, '../client/server-entry.js')
  },
  output: {
    filename: 'server-entry.js',
    path: path.join(__dirname, '../dist'),
    // 入口起点的返回值将分配给 module.exports 对象
    // https://doc.webpack-china.org/configuration/output/#output-librarytarget
    libraryTarget: 'commonjs2'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        include: [resolve('client')]
      }
    ]
  }
}

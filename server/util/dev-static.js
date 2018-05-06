const path = require('path')
const axios = require('axios')
const proxy = require('koa-proxies')
const webpack = require('webpack')
const MemoryFs = require('memory-fs')
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
  return new Promise((resolve, reject) => {
    axios.get('http://localhost:8888/public/index.html')
      .then(res => {
        resolve(res.data)
      })
      .catch(reject)
  })
}

const Module = module.constructor

const mfs = new MemoryFs()
const serverCompiler = webpack(serverConfig)

let serverBundle
serverCompiler.outputFileSystem = mfs
serverCompiler.watch({}, (err, stats) => {
  if (err) throw err
  stats = stats.toJson()
  stats.errors.forEach(err => console.error(err))
  stats.warnings.forEach(warn => console.warn(warn))

  const bundlePath = path.join(
    serverConfig.output.path,
    serverConfig.output.filename
  )

  const bundle = mfs.readFileSync(bundlePath, 'utf8')
  // hack方法，将字符串转为module
  const m = new Module()
  // 指定文件名
  m._compile(bundle, 'server-entry.js')
  serverBundle = m.exports.default
})

module.exports = function(app) {
  // 代理请求
  app.use(proxy('/public', {
    target: 'http://localhost:8888/'
  }));

  app.use(async ctx => {
    const template = await getTemplate()
    const content = ReactDomServer.renderToString(serverBundle)
    ctx.body = template.replace('<!-- app -->', content)
  })
}

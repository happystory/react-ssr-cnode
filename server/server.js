const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const mount = require('koa-mount')
const favicon = require('koa-favicon')
const ReactSSR = require('react-dom/server')
// 因为客户端是通过 export default 方式导出的
const serverEntry = require('../dist/server-entry').default

const isDev = process.env.NODE_ENV === 'development'

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = new Koa()

// 网页图标
app.use(favicon(path.join(__dirname, '../favicon.ico')))

if (!isDev) {
  // 将 dist 目录作静态资源挂载到 /public 下
  app.use(mount('/public', serve(path.join(__dirname, '../dist'))))

  app.use(async ctx => {
    const content = ReactSSR.renderToString(serverEntry)
    ctx.body = template.replace('<!-- app -->', content)
  })
} else {
  const devStatic = require('./util/dev-static')(app)
}

app.listen(3333, () => {
  console.log('Server running at http://0.0.0.0:3333/')
})

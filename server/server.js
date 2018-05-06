const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const serve = require('koa-static')
const mount = require('koa-mount');
const ReactSSR = require('react-dom/server')
// 因为客户端是通过 export default 方式导出的
const serverEntry = require('../dist/server-entry').default

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = new Koa()

// 将 dist 目录作静态资源挂载到 /public 下
app.use(mount('/public', serve(path.join(__dirname, '../dist'))))

app.use(async ctx => {
  const appString = ReactSSR.renderToString(serverEntry)
  const resBody = template.replace('<app></app>', appString)
  ctx.body = resBody
})

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000/')
})

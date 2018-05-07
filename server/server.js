const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const KoaRouter = require('koa-router')
const bodyParser = require('koa-bodyparser')
const session = require('koa-session')
const serve = require('koa-static')
const mount = require('koa-mount')
const favicon = require('koa-favicon')
const ReactSSR = require('react-dom/server')
// 因为客户端是通过 export default 方式导出的
const serverEntry = require('../dist/server-entry').default
const loginRouter = require('./util/handle-login')
const proxyRouter = require('./util/proxy')

const isDev = process.env.NODE_ENV === 'development'

const template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

const app = new Koa()
const router = new KoaRouter()

app.use(bodyParser())

app.keys = ['some secret hurr']

const CONFIG = {
  key: 'tid', /** (string) cookie key (default is koa:sess) */
  /** (number || 'session') maxAge in ms (default is 1 days) */
  /** 'session' will result in a cookie that expires when session/browser is closed */
  /** Warning: If a session cookie is stolen, this cookie will never expire */
  maxAge: 10 * 60 * 1000,
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};

app.use(session(CONFIG, app))

// 添加路由
router.use('/api/user', loginRouter.routes(), loginRouter.allowedMethods())
router.use('/api', proxyRouter.routes(), proxyRouter.allowedMethods())
app.use(router.routes())

// 网页图标
app.use(favicon(path.join(__dirname, '../favicon.ico')))

// if (!isDev) {
//   // 将 dist 目录作静态资源挂载到 /public 下
//   app.use(mount('/public', serve(path.join(__dirname, '../dist'))))
//
//   app.use(async ctx => {
//     const content = ReactSSR.renderToString(serverEntry)
//     ctx.body = template.replace('<!-- app -->', content)
//   })
// } else {
//   const devStatic = require('./util/dev-static')(app)
// }

app.listen(3333, () => {
  console.log('Server running at http://0.0.0.0:3333/')
})

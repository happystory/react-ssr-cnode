const Router = require('koa-router')
const axios = require('axios')
const router = new Router()

const baseUrl = 'http://cnodejs.org/api/v1'

router.all('*', async (ctx, next) => {
  // 去除前缀
  const path = ctx.request.path.slice(4)
  const user = ctx.session.user || {}
  const needAccessToken = ctx.query.needAccessToken

  if (needAccessToken && user.accessToken) {
    ctx.throw(401, {
      success: false,
      msg: 'need login'
    })
  }

  const query = Object.assign({}, ctx.query)
  if (query.needAccessToken) delete query.needAccessToken

  try {
    const resp = await axios(`${baseUrl}${path}`, {
      method: ctx.method,
      params: query,
      data: Object.assign({}, ctx.body, {
        accesstoken: user.accessToken
      }),
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
    if (resp.status === 200) {
      ctx.body = resp.data
    } else {
      ctx.throw(resp.status, resp.data)
    }
  } catch (err) {
    if (err.response) {
      ctx.throw(500, err.response.data)
    } else {
      ctx.throw(500, '未知错误')
    }
  }
})

module.exports = router

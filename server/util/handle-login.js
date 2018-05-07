const Router = require('koa-router')
const axios = require('axios')
const router = new Router()

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', async (ctx, next) => {
  try {
    const resp = await axios.post(`${baseUrl}/accesstoken`, {
      accesstoken: ctx.body.accessToken
    })
    if (resp.status === 200 && resp.data.success) {
      ctx.session.user = {
        accessToken: ctx.body.accessToken,
        loginName: resp.data.loginname,
        id: resp.data.id,
        avatarUrl: resp.data.avatar_url
      }
      ctx.body = {
        success: true,
        data: resp.data
      }
    }
  } catch (err) {
    if (err.response) {
      res.body = {
        success: false,
        data: err.response
      }
    } else {
      ctx.body = 'error'
      next(err)
    }
  }
})

module.exports = router

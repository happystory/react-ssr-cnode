const Router = require('koa-router')
const axios = require('axios')
const router = new Router()

const baseUrl = 'http://cnodejs.org/api/v1'

router.post('/login', async (ctx, next) => {
  try {
    const accessToken = ctx.request.body.accessToken
    const resp = await axios.post(`${baseUrl}/accesstoken`, {
      accesstoken: accessToken
    })
    if (resp.status === 200 && resp.data.success) {
      const { loginname, id, avatar_url } = resp.data
      ctx.session.user = {
        accessToken: accessToken,
        loginName: loginname,
        id,
        avatarUrl: avatar_url
      }

      ctx.body = {
        success: true,
        data: resp.data
      }
    }
  } catch (err) {
    if (err.response) {
      ctx.body = {
        success: false,
        data: err.response.data
      }
    } else {
      ctx.body = 'error'
      next(err)
    }
  }
})

module.exports = router

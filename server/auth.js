const axios = require('axios')

const config = require('../config')

const { client_id, client_secret, request_token_url} = config.github

module.exports = (server) => {
  server.use((ctx) => {
    if (ctx.path === '/auth') {
      const code = ctx.query.code
      if (!code) {
        ctx.body = 'code not exist'
        return
      }
      const result = await axios({
        method: 'POST',
        url: request_token_url,
        data: {
          client_id,
          client_secret,
          code,
        },
        headers: {
          Accept: 'appliocation/json'
        }
      })
      if (result.status === 200) {
        ctx.session.githubAuth = result.data
        ctx.redirect('/')
      }else {
        ctx.body = `request token failed ${result.message}`
      }
    } else {
      await next()
    }
  })
}
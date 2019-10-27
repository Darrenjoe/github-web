const axios = require('axios')

const config = require('../config')

const { client_id, client_secret, request_token_url} = config.github

module.exports = async (server) => {
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
      if (result.status === 200 && (result.data && !result.data.error)) {
        ctx.session.githubAuth = result.data

        const { access_token, token_type} = result.data

        const userInfoResp = await axios({
          method: 'GET',
          url: 'https://api.github.com/user',
          headers: {
            'Authorzation': `${token_type} ${access_token}`,
          }
        })
        console.log(userInfoResp.data);
        ctx.session.userInfo = userInfoResp.data;
        ctx.redirect('/')
      }else {
        const eroorMsg = result.data && !result.data.error
        ctx.body = `request token failed ${eroorMsg}`
      }
    } else {
      await next()
    }
  })
}
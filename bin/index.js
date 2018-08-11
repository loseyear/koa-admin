const Koa               = require('koa'),
      serve             = require('koa-static'),
      onerror           = require('koa-onerror'),
      path              = require('path'),
      cors              = require('kcors'),
      bodyParser        = require('koa-bodyparser'),
      webpackMiddleware = require('koa-webpack')

const app = new Koa()
const port = process.env.PORT || 9527

const router = require('../server/router')
const logger = require('../library/logger')
const render = require('../library/render')
const config = require('../build/dev.config')

if (process.env.NODE_ENV === 'development') {
  webpackMiddleware({
    config
  })
  .then((middleware) => {
    app.use(middleware)
  })
}

app.context.logger = logger;
app.use(serve(path.resolve(__dirname, './../assets/')))
// app.use(router())

app.use(async (ctx, next) => {
  if (ctx.path.match(/^\/api/)) {
    return router()
  }
  return await render(ctx, next);
});

app.on('error', (err, ctx) => {
  ctx.logger.error('server error', err)
})

if (process.env.NODE_ENV === 'development') {
  onerror(app)
}

app.listen(port, () => {
  console.warn('Server run on: http://0.0.0.0:%d', port)
})


const getUserInfo = (ctx, next) => {
  const query = ctx.query
  ctx.body = 'Hello world'
}

module.exports = {
  'GET /getUserInfo': getUserInfo,
}

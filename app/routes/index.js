const config = require('../../config');

module.exports = app => {
  require('./cloudEvents')(app, config);
  app.get('/health', (ctx, next) => {
    ctx.response.status = 200;
    ctx.body = 'OK';
    next();
  })
};

const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');

const app = new Koa();
const router = new Router();

require('./routes')(router);

// https://github.com/koajs/bodyparser
app.use(bodyParser({
  extendTypes: {
    json: ['application/cloudevents+json']
  }
}));
app.use(router.routes());
app.use(logger());

const port = Number(process.env.PORT) || 8081;

app.listen(port, () => {
  console.info(`🍺 Server running at http://localhost:${port}`);
});

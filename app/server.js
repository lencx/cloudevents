import Koa from 'koa';
import Router from 'koa-router';
import bodyParser from 'koa-bodyparser';
import logger from 'koa-logger';

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

const port = Number(process.env.PORT) || 8080;

app.listen(port, () => {
  console.info(`🍺 Server running at http://localhost:${port}`);
});

// test: proposal-optional-chaining
// const obj = {
//   foo: {
//     bar: {
//       baz: 42,
//     },
//   },
// };
// const baz = obj?.foo?.bar?.baz; // 42
// const safe = obj?.qux?.baz;
// console.log(baz, safe)
const Koa = require('koa');
const app = new Koa();
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser')();
const logger = require('koa-logger');

const beeApi = require('./beeApi/api');

// error handler
onerror(app);
app.use(beeCors);
// middlewares
app.use(bodyparser);
app.use(json());
app.use(logger());
// app.use(require('koa-static')(__dirname + '/public'));

// app.use(views(__dirname + '/beeviews', {
//   extension: 'ejs'
// }));

// logger
app.use(async (ctx, next) => {
  const start = new Date();
  await next();
  const ms = new Date() - start;
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
});

// routes
app.use(beeApi.routes(), beeApi.allowedMethods());

async function beeCors(ctx, next) {
    ctx.set('Access-Control-Allow-Origin', '*');
    ctx.set('Access-Control-Allow-Methods', 'GET,HEAD,POST,DELETE');
    ctx.set('Access-Control-Allow-Headers', 'Content-Type');
    if(ctx.method == 'OPTIONS') {
        ctx.status == 204;
    } else {
        await next();
    }

}
module.exports = app;

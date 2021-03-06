'use strict';

const http = require('http');
const Koa = require('koa');

const app = new Koa();
app.use(async ctx => {
  ctx.body = 'done';
});

const server = http.createServer(app.callback());
server.once('error', err => {
  console.error('[server]', err.stack);
  process.exit(1);
});
server.once('listening', () => {
  console.info('[server] listening 8000');
});

console.info('[server] listen 8000');
server.listen(8000);

process.once('SIGTERM', () => {
  console.log('[server] server stopped');
  process.exit();
});

console.error('[server] error');

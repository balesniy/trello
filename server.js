const Koa = require('koa');
const io = require('socket.io');
const app = new Koa();
const path = require('path');
const fs = require('fs');
const mongoose = require('./libs/mongoose');
const jwt = require('koa-jwt');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function (middleware) {
  app.use(require('./middlewares/' + middleware));
});

// ---------------------------------------

const Router = require('koa-router');

const router = new Router();
const authenticate = jwt({
  secret:   '7RrOvToIjnKgRHSM0YiKrlE0JKScQj7-97X1xjZ1i_l6OD8AMcYVoofj1ytyS9jF',
  audience: '7ZkyiHp2zJFhK01NQMXYcMhArdOAq2Z2'
});
router.post('/login', require('./routes/login').post);
router.post('/register', require('./routes/register').post);
router.get('/verify-email/:token', require('./routes/verifyEmail').get);
router.get('/api/private', authenticate, function (ctx) {
  ctx.body = { message: ctx.state.user.sub };
});
router.get('/api/public', function (ctx) {
  ctx.body = { message: "Hello from a public endpoint! You don't need to be authenticated to see this." }
});
app.use(router.routes());

// app.use(jwt({ secret: 'shared-secret' }).unless({ path: [/^\/public/] }));
// // Unprotected middleware
// app.use(function (ctx, next) {
//   if (ctx.url.match(/^\/public/)) {
//     ctx.body = 'unprotected\n';
//   }
//   else {
//     return next();
//   }
// });
//
// // Protected middleware
// app.use(function (ctx) {
//   if (ctx.url.match(/^\/api/)) {
//     ctx.body = 'protected\n';
//   }
// });

const server = app.listen(3001, () => console.log('listening...'));
const socket = io(server);
socket.on('connection', () => console.log('connected'));

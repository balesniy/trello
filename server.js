const Koa = require('koa');
const app = new Koa();
const path = require('path');
const fs = require('fs');
const mongoose = require('./libs/mongoose');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();

middlewares.forEach(function (middleware) {
  app.use(require('./middlewares/' + middleware));
});

// ---------------------------------------

const Router = require('koa-router');

const router = new Router();
router.post('/login', require('./routes/login').post);
router.post('/register', require('./routes/register').post);
router.get('/verify-email/:token', require('./routes/verifyEmail').get);
app.use(router.routes());

app.listen(3001, () => console.log('listening...'));

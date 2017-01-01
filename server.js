const Koa = require('koa');
const socketio = require('socket.io');
const app = new Koa();
const path = require('path');
const fs = require('fs');
const mongoose = require('./libs/mongoose');
const Project = require('./models/project');
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

router.get('/api/private/projects', authenticate, async function (ctx) {
  const { sub } = ctx.state.user;
  ctx.body = await Project.find({ users: sub });
});
router.get('/api/private/projects/:_id', authenticate, async function (ctx) {
  const { _id } = ctx.params;
  ctx.body = await Project.findById(_id);
});
router.post('/api/private/projects', authenticate, async function (ctx) {
  const { name } = ctx.request.body;
  const { sub } = ctx.state.user;
  const project = new Project({
    name,
    users: sub
  });
  ctx.body = await project.save();
});
router.del('/api/private/projects', authenticate, async function (ctx) {
  ctx.body = ctx.request.body;
});
router.get('/api/public', function (ctx) {
  ctx.body = { message: "Hello from a public endpoint! You don't need to be authenticated to see this." }
});
app.use(router.routes()).use(router.allowedMethods());

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
const io = socketio(server);
io.on('connection', (socket) => {
  socket.on('tasks:next', async(data, cb) => {
    const project = await Project.findById(data.project);
    cb(await project.nextTask(data));
  });
  socket.on('tasks:prev', async(data, cb) => {
    const project = await Project.findById(data.project);
    cb(await project.prevTask(data));
  });
  socket.on('tasks:add', async(data, cb) => {
    const project = await Project.findById(data.project);
    cb(await project.addTask(data));
  });
  socket.on('tasks:delete', async(data, cb) => {
    const project = await Project.findById(data.project);
    cb(await project.deleteTask(data));
  });
  socket.on('tasks:up', async(data, cb) => {
    const project = await Project.findById(data.project);
    cb(await project.upTask(data));
  });
  socket.on('tasks:down', async(data, cb) => {
    const project = await Project.findById(data.project);
    cb(await project.downTask(data));
  });
  socket.on('tasks:update', async(data, cb) => {
    const project = await Project.findById(data.project);
    cb(await project.updateTask(data));
  });

});

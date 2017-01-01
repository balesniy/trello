const mongoose = require('mongoose');
const { schema, model } = require('./task');
const projectSchema = new mongoose.Schema({
  name:  {
    type:     String,
    required: 'Проекту требуется имя',
  },
  tasks: [schema],
  users: [
    {
      type:     String,
      required: 'Проекту нужен хозяин',
    }
  ]
}, {
  timestamps: true
});
projectSchema.methods.addUser = async function (id) {
  this.users.addToSet(id);
  await this.save();
  return this
};
projectSchema.methods.addTask = async function (data) {
  const task = new model(data);
  this.tasks.addToSet(task);
  return await this.save();
};
projectSchema.methods.deleteTask = async function (data) {
  this.tasks.pull(data._id);
  return await this.save();
};
projectSchema.methods.upTask = async function (data) {
  const item = this.tasks.find(({ _id }) => _id.toString() === data._id);
  const { order, status } = item;
  if (!order) {
    return this;
  }
  const prev = this.tasks.find(task => task.status === status && task.order === order - 1);
  const uPrev = new model(Object.assign({}, prev.toObject(), { order }));
  const uItem = new model(Object.assign({}, item.toObject(), { order: order - 1 }));
  this.tasks.remove(prev);
  this.tasks.remove(item);
  this.tasks.push(uPrev, uItem);
  return await this.save();
};
projectSchema.methods.downTask = async function (data) {
  const item = this.tasks.find(({ _id }) => _id.toString() === data._id);
  const { order, status } = item;
  const prev = this.tasks.find(task => task.status === status && task.order === order + 1);
  if (!prev) {
    return this;
  }
  const uPrev = new model(Object.assign({}, prev.toObject(), { order }));
  const uItem = new model(Object.assign({}, item.toObject(), { order: order + 1 }));
  this.tasks.remove(prev);
  this.tasks.remove(item);
  this.tasks.push(uPrev, uItem);
  return await this.save();
};
projectSchema.methods.nextTask = async function (data) {
  const item = this.tasks.find(({ _id }) => _id.toString() === data._id);
  const nextStatus = item.status === 'todo' ? 'inprogress' : 'done';
  if (nextStatus === item.status) {
    return this;
  }
  const nextOrder = this.tasks.filter(task => task.status === nextStatus).length;
  const uItem = new model(Object.assign({}, item.toObject(), {
    order:  nextOrder,
    status: nextStatus
  }));
  this.tasks.remove(item);
  this.tasks.push(uItem);
  return await this.save();
};
projectSchema.methods.prevTask = async function (data) {
  const item = this.tasks.find(({ _id }) => _id.toString() === data._id);
  const nextStatus = item.status === 'done' ? 'inprogress' : 'todo';
  if (nextStatus === item.status) {
    return this;
  }
  const nextOrder = this.tasks.filter(task => task.status === nextStatus).length;
  const uItem = new model(Object.assign({}, item.toObject(), {
    order:  nextOrder,
    status: nextStatus
  }));
  this.tasks.remove(item);
  this.tasks.push(uItem);
  return await this.save();
};

projectSchema.methods.updateTask = async function (data) {
  const { status, tasks, from } = data;
  const newTask = (task, i) => new model(Object.assign({}, task, { order: i }));
  if (status === from.status) {
    this.tasks = [...this.tasks.filter(task => task.status !== status), ...tasks.map(newTask)]
  }
  else {
    this.tasks =
      [...this.tasks.filter(task => task._id.toString() !== from._id && task.status !== status), ...tasks.map(newTask)]
  }
  return await this.save();
};

module.exports = mongoose.model('Project', projectSchema);
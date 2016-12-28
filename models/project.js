const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
  name:        {
    type:     String,
    required: "Задаче требуется имя"
  },
  description: {
    type: String,
  },
  author:      {
    type: mongoose.Schema.Types.ObjectId,
    ref:  'User'
  },
  status:      {
    type:     String,
    required: "Задаче требуется статус",
    enum:     ['todo', 'inprogress', 'done'],
    default:  'todo'
  },
  order:       {
    type:     Number,
    required: "Задаче требуется приоритет",
    validate: [
      {
        validator: function order(value) {
          return (~~value === value) && !(value < 0);
        },
        msg:       'Укажите, пожалуйста, корректный приоритет'
      }
    ]
  },
  startDate:   Date,
  todoDate:    Date,
}, {
  timestamps: true,
});
taskSchema.methods.getAuthor = async function () {
  return await this.populate('author')
};
taskSchema.methods.getPublicFields = function () {
  return {
    name:        this.name,
    description: this.description,
    status:      this.status,
    order:       this.order,
    author:      this.author,
  }
};
const projectSchema = new mongoose.Schema({
  name:  {
    type:     String,
    required: 'Проекту требуется имя',
  },
  tasks: [taskSchema],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref:  'User'
    }
  ]
}, {
  timestamps: true
});
projectSchema.methods.addUser = async function (_id) {
  this.users.addToSet(_id);
  await this.save();
  return this
};
projectSchema.methods.getUsers = async function () {
  return await this.populate('users')
};
module.exports = mongoose.model('Project', projectSchema);
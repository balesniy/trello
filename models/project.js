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
    type: String,
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

module.exports = mongoose.model('Project', projectSchema);
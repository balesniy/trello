const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
import {createAction, createActions} from 'redux-actions';
const socket = require('socket.io-client')('http://localhost:3001');

export const getTasks = createAction(GET_TASKS_SUCCESS, async(auth, id) => {
  return await auth.fetch(`/api/private/projects/${id}`)
});

export const { add, up, down, prev, next, close, update } = createActions({
  UP:     async(data) => {
    return await new Promise(res => {
      socket.emit('tasks:up', data, res)
    });
  },
  DOWN:   async(data) => {
    return await new Promise(res => {
      socket.emit('tasks:down', data, res)
    });
  },
  PREV:   async(data) => {
    return await new Promise(res => {
      socket.emit('tasks:prev', data, res)
    });
  },
  NEXT:   async(data) => {
    return await new Promise(res => {
      socket.emit('tasks:next', data, res)
    });
  },
  CLOSE:  async(data) => {
    return await new Promise(res => {
      socket.emit('tasks:delete', data, res)
    });
  },
  ADD:    async(data) => {
    return await new Promise(res => {
      socket.emit('tasks:add', data, res)
    });
  },
  UPDATE: async(status, tasks, from, project) => {
    return await new Promise(res => {
      socket.emit('tasks:update', {
        status,
        tasks,
        from,
        project
      }, res)
    });
  }
});

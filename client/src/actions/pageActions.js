const GET_TASKS_SUCCESS = 'GET_TASKS_SUCCESS';
import {createAction, createActions} from 'redux-actions';
const socket = require('socket.io-client')('http://localhost:3001');

socket.on('connect', function () {
  console.log('connect')
});
// export const getTasks = createAction(GET_TASKS_SUCCESS, async() => {
//   return await new Promise(res=> {
//     socket.emit('tasks:read', res)
//   });
// });
export const getTasks = createAction(GET_TASKS_SUCCESS, async() => {
  return await new Promise(res => {
    setTimeout(() => res([
      {
        name:        'first',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.',
        order:       0,
        status:      'todo',
        id:          0,
      }, {
        id:          1,
        name:        'second',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.',
        order:       1,
        status:      'todo'
      }, {
        id:          2,
        name:        'third',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.',
        order:       2,
        status:      'todo'
      }, {
        id:          3,
        name:        'fourth',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.',
        order:       1,
        status:      'inprogress'
      }, {
        id:          4,
        name:        'fifth',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.',
        order:       0,
        status:      'inprogress'
      }, {
        id:          5,
        name:        'sixth',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.',
        order:       1,
        status:      'done'
      }, {
        id:          6,
        name:        'seventh',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas sed diam eget risus varius blandit sit amet non magna. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent commodo cursus magna, vel scelerisque nisl consectetur et. Cras mattis consectetur purus sit amet fermentum. Duis mollis, est non commodo luctus, nisi erat porttitor ligula, eget lacinia odio sem nec elit. Aenean lacinia bibendum nulla sed consectetur.',
        order:       0,
        status:      'done'
      }
    ]), 500)
  });
});
export const { up, down, prev, next, close, update } = createActions({
  UP:     id => ({ id }),
  DOWN:   id => ({ id }),
  PREV:   id => ({ id }),
  NEXT:   id => ({ id }),
  CLOSE:  id => ({ id }),
  UPDATE: (status, tasks, from) => ({
    status,
    tasks,
    from
  }),
});
export const add = createAction('ADD');
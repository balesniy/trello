const ADD_PROJECT = 'ADD_PROJECT';
const REMOVE_PROJECT = 'REMOVE_PROJECT';
import {createAction, createActions} from 'redux-actions';

// export const getTasks = createAction(GET_TASKS_SUCCESS, async() => {
//   return await new Promise(res=> {
//     socket.emit('tasks:read', res)
//   });
// });
export const { addProject, removeProject } = createActions(
  ADD_PROJECT,
  REMOVE_PROJECT,
);

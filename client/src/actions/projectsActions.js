const ADD_PROJECT = 'ADD_PROJECT';
const REMOVE_PROJECT = 'REMOVE_PROJECT';
const GET_PROJECTS = 'GET_PROJECTS';
import {createAction, createActions} from 'redux-actions';

export const getProjects = createAction(GET_PROJECTS, async(auth) => {
  return await auth.fetch('/api/private/projects')
});

export const { addProject, removeProject } = createActions(
  {
    [ADD_PROJECT]:    async(auth, data) => {
      return await auth.fetch('/api/private/projects', {
        method: 'POST',
        body:   JSON.stringify(data)
      })
    },
    [REMOVE_PROJECT]: async(auth, data) => {
      return await auth.fetch('/api/private/projects', {
        method: 'DELETE',
        body:   JSON.stringify(data)
      })
    },
  }
);

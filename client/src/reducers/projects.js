import {handleActions} from 'redux-actions';
import {addProject, removeProject, getProjects} from '../actions/projectsActions'
export default handleActions({
  [addProject]:    (state, { payload }) => [...state, payload],
  [removeProject]: (state, { payload }) => state.filter(({ id }) => id !== payload),
  [getProjects]:   (state, { payload }) => [...payload],
}, {})
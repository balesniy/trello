import {handleActions} from 'redux-actions';
import {addProject, removeProject} from '../actions/projectsActions'
export default handleActions({
  [addProject]:    (state, { payload }) => [...state, payload],
  [removeProject]: (state, { payload }) => state.filter(({ id }) => id !== payload),
}, {})
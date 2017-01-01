import {handleActions} from 'redux-actions';
import {getTasks} from '../actions/pageActions'
export default handleActions({
    [getTasks]: (state, action) => [...action.payload.tasks].sort((a, b) => a.order - b.order),
    ADD:        (state, action) => [...action.payload.tasks],
    CLOSE:      (state, action) => [...action.payload.tasks],
    UP:         (state, action) => [...action.payload.tasks].sort((a, b) => a.order - b.order),
    DOWN:       (state, action) => [...action.payload.tasks].sort((a, b) => a.order - b.order),
    NEXT:       (state, action) => [...action.payload.tasks],
    PREV:       (state, action) => [...action.payload.tasks],
    UPDATE:     (state, action) => [...action.payload.tasks].sort((a, b) => a.order - b.order),
  }
  , []);
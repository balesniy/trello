import {handleActions} from 'redux-actions';
import {loginUser, logoutUser} from '../actions/userActions'
export default handleActions({
  [loginUser]:  (state, { payload }) => ({
    ...payload
  }),
  [logoutUser]: (state, action) => ({}),
}, {})
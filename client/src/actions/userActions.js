import {createActions} from 'redux-actions';
import {checkHttpStatus, parseJSON} from '../utils';
export const { loginUser, logoutUser, registerUser } = createActions({
  LOGIN_USER:    async(email, password) => {
    const { token, name } = await fetch('/login', {
      method:  'post',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      },
      body:    JSON.stringify({
        email,
        password
      })
    }).then(checkHttpStatus).then(parseJSON);
    localStorage.setItem('token', token);
    return {
      name,
      token
    }
  },
  LOGOUT_USER:   async(name, token) => {
    const { status } = await fetch('/logout', {
      method:  'post',
      headers: {
        'Accept':        'application/json',
        'Content-Type':  'application/json',
        'Authorization': `JWT ${token}`
      },
      body:    JSON.stringify({
        name,
      })
    }).then(checkHttpStatus).then(parseJSON);
    localStorage.removeItem('token');
    return {
      status
    }
  },
  REGISTER_USER: async(email, password, name) => {
    await fetch('/register', {
      method:  'post',
      headers: {
        'Accept':       'application/json',
        'Content-Type': 'application/json'
      },
      body:    JSON.stringify({
        email,
        password,
        name
      })
    }).then(checkHttpStatus).then(parseJSON);
  },
});
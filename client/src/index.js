import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, browserHistory} from 'react-router';
import App from './containers/App';
import Register from './containers/Register';
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
const initialState = {
  user: {},
};
const store = createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware, createLogger()));
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}/>
      <Route path="/register" component={Register}/>
    </Router>
  </Provider>,
  document.getElementById('root')
);

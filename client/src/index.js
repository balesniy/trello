import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import {Router, Route, browserHistory, IndexRedirect} from 'react-router';
import Home from './components/Home';
import Login from './components/Login';
import Page from './containers/Page';
import Projects from './containers/Projects';
import Container from './containers/Login';
import rootReducer from './reducers'
import createLogger from 'redux-logger'
import promiseMiddleware from 'redux-promise';
import {AuthService} from './utils'
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';

const auth = new AuthService('7ZkyiHp2zJFhK01NQMXYcMhArdOAq2Z2', 'balesniy.eu.auth0.com');

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/login' })
  }
};

const initialState = {
  user:     {},
  projects: [],
  tasks:    []
};
const store = createStore(rootReducer, initialState, applyMiddleware(promiseMiddleware, createLogger()));
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Container} auth={auth}>
        <IndexRedirect to="/home"/>
        <Route path="home" component={Home} onEnter={requireAuth}/>
        <Route path="login" component={Login}/>
        <Route path="projects" component={Projects} onEnter={requireAuth}/>
        <Route path="page/:id" component={Page}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);

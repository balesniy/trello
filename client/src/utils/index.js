export function checkHttpStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response
  }
  else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error
  }
}
export function parseJSON(response) {
  return response.json()
}

import Auth0Lock from 'auth0-lock'
import decode from 'jwt-decode';
import {browserHistory} from 'react-router'
import {EventEmitter} from 'events'

export function getTokenExpirationDate(token) {
  const decoded = decode(token);
  if (!decoded.exp) {
    return null
  }

  const date = new Date(0);// The 0 here is the key, which sets the date to the epoch
  date.setUTCSeconds(decoded.exp);
  return date
}

export function isTokenExpired(token) {
  const date = getTokenExpirationDate(token);
  const offsetSeconds = 0;
  if (date === null) {
    return false
  }
  return !(date.valueOf() > (new Date().valueOf() + (offsetSeconds * 1000)))
}

export class AuthService extends EventEmitter {
  constructor(clientId, domain) {
    super();
    // Configure Auth0
    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        redirectUrl:  'http://localhost:3000/login',
        responseType: 'token'
      }
    });
    // Add callback for lock `authenticated` event
    this.lock.on('authenticated', this._doAuthentication.bind(this));
    // Add callback for lock `authorization_error` event
    this.lock.on('authorization_error', this._authorizationError.bind(this));
    // binds login functions to keep this context
    this.login = this.login.bind(this)
  }

  _authorizationError(e) {
    console.log(e)
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept':       'application/json',
      'Content-Type': 'application/json',
    };
    // if logged in, includes the authorization header
    if (this.loggedIn()) {
      headers['Authorization'] = 'Bearer ' + this.getToken()
    }

    return fetch(url, {
      headers,
      ...options
    })
      .then(checkHttpStatus) // to raise errors for wrong status
      .then(parseJSON); // to parse the response as json
  }

  _doAuthentication(authResult) {
    // Saves the user token
    this.setToken(authResult.idToken);
    // navigate to the home route
    browserHistory.replace('/home');
    // Async loads the user profile data
    this.lock.getProfile(authResult.idToken, (error, profile) => {
      if (error) {
        console.log('Error loading the Profile', error)
      }
      else {
        this.setProfile(profile)
      }
    })
  }

  setProfile(profile) {
    // Saves profile data to local storage
    localStorage.setItem('profile', JSON.stringify(profile));
    // Triggers profile_updated event to update the UI
    this.emit('profile_updated', profile)
  }

  getProfile() {
    // Retrieves the profile data from local storage
    const profile = localStorage.getItem('profile');
    return profile ? JSON.parse(localStorage.profile) : {}
  }

  login() {
    // Call the show method to display the widget.
    this.lock.show()
  }

  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !isTokenExpired(token)
  }

  setToken(idToken) {
    // Saves user token to local storage
    localStorage.setItem('id_token', idToken)
  }

  getToken() {
    // Retrieves the user token from local storage
    return localStorage.getItem('id_token')
  }

  logout() {
    // Clear user token and profile data from local storage
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
  }
}
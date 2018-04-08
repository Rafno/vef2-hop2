
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
/*TODO skoða afhverju það er message í RequestLogin og sjá hvort það vanti á hina. */
import api from '../api';
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_LOGOUT, LOGIN_SUCCESS } from './types';

export const requestLogin = () => dispatch => {
  console.log("logging in");
  dispatch({
    type: LOGIN_REQUEST,
    isFetching: true,
    isAuthenticated: false,
    payload: null,
  })
};
export const receiveLogin = (username, password) => dispatch => {
  const testing = fetch('https://verkefni2server.herokuapp.com/login', {
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({ "username": username, "password": password })
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        user: username,
        payload: login.token,
      }))
  console.log(testing);
};
export const loginError = message => dispatch => {
  console.log("login failed");
  dispatch({
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    payload: null,
  })
};
export const loginOut = () => dispatch => {
  console.log("logged out");
  dispatch({
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  })
};


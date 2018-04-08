
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
export const CreateBook = (title, author, about, isbn10, isbn13, published, pagecount, language, category) => async dispatch => {
  const testing = await fetch('https://verkefni2server.herokuapp.com/books', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTIzMjE2ODM0LCJleHAiOjE1MjMyMTgwMzR9.ZhoUi8MlPw_xnM71NgEX5HxexCTtVDYu5GPn4U568e0`
    },
    body: JSON.stringify({"title":title,
    "author":author,
    "description":about,
    "isbn10":isbn10,
    "isbn13":isbn13,
    "published":published,
    "pagecount":pagecount,
    "language":language,
    "category":category })
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        payload: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTIzMjE2ODM0LCJleHAiOjE1MjMyMTgwMzR9.ZhoUi8MlPw_xnM71NgEX5HxexCTtVDYu5GPn4U568e0',
      }))
  console.log(testing);
};
export const CreateBookById = (title, author, about, isbn10, isbn13, published, pagecount, language, category, id) => async dispatch => {
  const testing = await fetch(`https://verkefni2server.herokuapp.com/books/${id}`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization':`Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTIzMjE2ODM0LCJleHAiOjE1MjMyMTgwMzR9.ZhoUi8MlPw_xnM71NgEX5HxexCTtVDYu5GPn4U568e0`
    },
    body: JSON.stringify({"title":title,
    "author":author,
    "description":about,
    "isbn10":isbn10,
    "isbn13":isbn13,
    "published":published,
    "pagecount":pagecount,
    "language":language,
    "category":category })
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: LOGIN_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        payload: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiaWF0IjoxNTIzMjE2ODM0LCJleHAiOjE1MjMyMTgwMzR9.ZhoUi8MlPw_xnM71NgEX5HxexCTtVDYu5GPn4U568e0',
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


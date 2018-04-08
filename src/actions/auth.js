
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
/*TODO skoða afhverju það er message í RequestLogin og sjá hvort það vanti á hina. */
import api from '../api';
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_LOGOUT, LOGIN_SUCCESS, NAMECHANGE_SUCCESS } from './types';

export const checkLogin = () => dispatch => {
  fetch('https://verkefni2server.herokuapp.com/books', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
    }
    })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: LOGIN_REQUEST,
        isFetching: false,
        isAuthenticated: true,
        user: login.username,
        payload: localStorage.getItem("Token"),
      }))
}
export const receiveLogin = (username, password) => dispatch => {
  fetch('https://verkefni2server.herokuapp.com/login', {
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
};
export const CreateBook = (title, author, about, isbn10, isbn13, published, pagecount, language, category) => async dispatch => {
    fetch('https://verkefni2server.herokuapp.com/books', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`},
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
        payload: localStorage.getItem("Token"),
      }))
  console.log(localStorage.getItem("Token"));
};
export const UpdateBookById = (title, author, about, isbn10, isbn13, published, pagecount, language, category, id) => async dispatch => {
  const testing = await fetch(`https://verkefni2server.herokuapp.com/books/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
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
        type: NAMECHANGE_SUCCESS,
        isFetching: false,
        isAuthenticated: true,
        payload: localStorage.getItem("Token"),
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

  export const changeName = (name) => dispatch => {
    const testing = fetch(`https://verkefni2server.herokuapp.com/users/me`, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
        'authorization': `bearer ${localStorage.getItem("Token")}`
      },
      body: JSON.stringify({
        "username": localStorage.getItem("username"),
        "password": localStorage.getItem("password"),
        "name": name
      })
    })
      .then(res => res.json())
      .then(login =>
        dispatch({
          type: LOGIN_SUCCESS,
          isFetching: false,
          isAuthenticated: true,
          payload: localStorage.getItem("Token"),
        }))
    };
  
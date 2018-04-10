
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
/*TODO skoða afhverju það er message í RequestLogin og sjá hvort það vanti á hina. */
import api from '../api';
import { LOGIN_REQUEST, BOOK_REQUEST, LOGIN_SUCCESS, READ_REQUEST, BOOK_REGISTER_REQUEST, BOOK_PATCH_REQUEST, LOGIN_FAILURE, USER_PATCH_REQUEST, LOGIN_LOGOUT } from './types';

export const checkLogin = (maybeToken) => dispatch => {
  fetch('https://verkefni2server.herokuapp.com/users/me', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${maybeToken}`
    }
  })
    .then(res => res.json())
    .then(user =>
      dispatch({
        type: LOGIN_REQUEST,
        isFetching: false,
        user,
      }))
}
export const getBooks = () => dispatch => {
  fetch('https://verkefni2server.herokuapp.com/users/me/read', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
    }
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: BOOK_REQUEST,
        isFetching: false,
        payload: login,
      }))
}

function letsLogIn(token) {
  const user = fetch('https://verkefni2server.herokuapp.com/users/me', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${token}`
    }
  })
    .then(res => { return res.json() })
  return user;
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
    .then(login => {
      const a = letsLogIn(login.token);
      a.then(function (result) {
        dispatch({
          type: LOGIN_SUCCESS,
          isFetching: false,
          isAuthenticated: true,
          user: result,
          payload: login.token,
        })
      });
    })
};
export const readBookByUser = (einkunn, texti, title) => dispatch => {
  fetch(`https://verkefni2server.herokuapp.com/users/me/read`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
    },
    body: JSON.stringify({
      "title": title,
      "grade": einkunn,
      "judge": texti
    })
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: READ_REQUEST,
        isFetching: false,
        message: login,
      }))
};
export const CreateBook = (title, author, about, isbn10, isbn13, published, pagecount, language, category) => async dispatch => {
  fetch('https://verkefni2server.herokuapp.com/books', {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
    },
    body: JSON.stringify({
      "title": title,
      "author": author,
      "description": about,
      "isbn10": isbn10,
      "isbn13": isbn13,
      "published": published,
      "pagecount": pagecount,
      "language": language,
      "category": category
    })
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: BOOK_REGISTER_REQUEST,
        isFetching: false,
        message: login,
      }))
};
export const UpdateBookById = (title, author, about, isbn10, isbn13, published, pagecount, language, category, id) => async dispatch => {
  fetch(`https://verkefni2server.herokuapp.com/books/${id}`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
    },
    body: JSON.stringify({
      "title": title,
      "author": author,
      "description": about,
      "isbn10": isbn10,
      "isbn13": isbn13,
      "published": published,
      "pagecount": pagecount,
      "language": language,
      "category": category
    })
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: BOOK_PATCH_REQUEST,
        isFetching: false,
        message: login,
      }))
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
export const UpdatePassword = (id, password, username) => dispatch => {
  if (username === null) {
    username = localStorage.getItem("username");
  }
  if (password === null) {
    password = localStorage.getItem("password");
  }
  const testing = fetch(`https://verkefni2server.herokuapp.com/users/me`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
    },
    body: JSON.stringify({
      "id": id,
      "username": username,
      "password": password,
      "name": 'blobbb',
    })
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: USER_PATCH_REQUEST,
        isFetching: false,
        message: login,
      }))
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
/**
 * *changeName og changePassword skemma "name" hlutann eins og er. TODO. þarf að útfæra name í localstorage.
 * @param {any} name
 */
// tók ekki eftir þessum 2 en er búinn að útfæra að breyta lykilorði og username

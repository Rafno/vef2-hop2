
/**
 * Ef redux er notað skal skilgreina allar actions fyrir auth hér og
 * síðan í annari skrá fyrir aðra virkni.
 * Í async "thunks" ætti þá að gera vefþjónustuköll
 */
/*TODO skoða afhverju það er message í RequestLogin og sjá hvort það vanti á hina. */
import api from '../api';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { VIEW_USER, LOGIN_REQUEST, SIGN_BOOK,BOOK_REQUEST, LOGIN_SUCCESS, READ_REQUEST, BOOK_REGISTER_REQUEST, BOOK_PATCH_REQUEST, LOGIN_FAILURE, USER_PATCH_REQUEST, LOGIN_LOGOUT, VIEW_USERS, UPDATE_USER } from './types';



export const updateUser = (userId) => dispatch => {
  fetch(`https://verkefni2server.herokuapp.com/users/${userId}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
    }
  })
    .then(res => res.json())
    .then(users =>
      dispatch({
        type: VIEW_USER,
        isFetching: false,
        notandi: users.user,
      })
      )
}
export const delBook = (id) => dispatch => {
  const data = fetch(`https://verkefni2server.herokuapp.com/users/me/read/${id}`, {
    method: 'DELETE',
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
export const viewUser = (token, page) => dispatch => {
  fetch(`https://verkefni2server.herokuapp.com/users?offset=${page}&limit=10&`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${token}`
    }
  })
    .then(res => res.json())
    .then(users => {
      if (!token) {
        dispatch({
          type: LOGIN_LOGOUT,
          isFetching: false,
          isAuthenticated: false,
          user: null,
        })
      } else {
        dispatch({
          type: VIEW_USERS,
          isFetching: false,
          users,
        })
      }
      })
}
export const checkLogin = (maybeToken) => dispatch => {
  fetch('https://verkefni2server.herokuapp.com/users/me', {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${maybeToken}`
    }
  })
    .then(res => res.json())
    .then(user => {
      if (user.error) {
        dispatch({
          type: LOGIN_LOGOUT,
          isFetching: false,
          isAuthenticated: false,
          user: null,
        })
      } else {
        dispatch({
          type: LOGIN_REQUEST,
          isFetching: false,
          user,
        })
      }
    })
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
      if (login.token) {
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
      } else {
        dispatch({
          type: LOGIN_FAILURE,
          isAuthenticated: false,
          user: null,
          error:login.error,
        })
      }
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
  fetch(`https://verkefni2server.herokuapp.com/books`, {
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
    .then(login => {
      let Error = 'Þú verður að fylla upp í skyldureiti';
      if (login.data) Error = 'Skráning tókst';
      if (login[0]) Error = login[0].Error;
      if (login.errarray) Error = login.errarray[0].Error;
      dispatch({
        type: BOOK_REGISTER_REQUEST,
        isFetching: false,
        message: Error,
      })
    })
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
      })
    )
};
export const getBookById = (id) => async dispatch => {
  fetch(`https://verkefni2server.herokuapp.com/books/${id}`, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
    .then(res => res.json())
    .then(login =>
      dispatch({
        type: BOOK_REQUEST,
        isFetching: false,
        payload: login,
      }))
};

export const loginError = message => dispatch => {
  dispatch({
    type: LOGIN_FAILURE,
    isFetching: false,
    isAuthenticated: false,
    payload: null,
  })
};
export const UpdatePassword = (id, username, name, password) => dispatch => {
  let breyta = localStorage.getItem('user');
  const users = JSON.parse(breyta);
  if (name === null) {
      name = users.name;
  }
  if (password === null) {
      password = users.password;
  }
  let user = { 'username': username, 'password': users.password, "name": users.name, "id": id };
      // Put the object into storage
      localStorage.setItem('user', JSON.stringify(user));
    fetch(`https://verkefni2server.herokuapp.com/users/me`, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
      'authorization': `bearer ${localStorage.getItem("Token")}`
    },
    body: JSON.stringify({
      "id": id,
      "username": username,
      "password": password,
      "name": name,
    })
  })
    .then(res => res.json())
      .then(login => {
      if (login.Success) {
        dispatch({
          type: USER_PATCH_REQUEST,
          isFetching: false,
          message: login.Success,
        })
      } else {
      dispatch({
        type: USER_PATCH_REQUEST,
        isFetching: false,
        message: login.error[0].error,
        })
      }
        })
};
export const loginOut = () => dispatch => {
  dispatch({
    type: LOGIN_LOGOUT,
    isFetching: false,
    isAuthenticated: false,
    user: null,
  })
};
export const uploadPic = (file) => dispatch => {
  dispatch({
    type: UPDATE_USER,
    picture: file,
  })
};

export const signReadBook = (book) => dispatch => {
  dispatch({
    type: SIGN_BOOK,
    readBook: book,
  })
};
import api from '../api';
import { FETCH_BOOKS, NEW_BOOK } from './types';

export const fetchBooks = () => dispatch => {
  const baseUrl = 'https://verkefni2server.herokuapp.com/';
  fetch(`${baseUrl}books`)
    .then(res => res.json())
    .then(books =>
      dispatch({
        type: FETCH_BOOKS,
        payload: books
      })
    );
};
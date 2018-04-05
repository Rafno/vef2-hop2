import api from '../api';
import { FETCH_BOOKS, NEW_BOOK } from './types';

export const fetchBooks = () => dispatch => {
  const baseUrl = 'http://127.0.0.1:3002/';
  console.log(process.env);
  fetch(`${baseUrl}books`)
    .then(res => res.json())
    .then(books =>
      dispatch({
        type: FETCH_BOOKS,
        payload: books
      })
    );
};
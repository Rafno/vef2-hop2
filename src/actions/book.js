import api from '../api';
import { FETCH_BOOKS, NEW_BOOK } from './types';

export const fetchBooks = () => dispatch => {
  const {
    REACT_APP_SERVICE_URL: url = 'http://127.0.0.1:3002/',
  } = process.env;
  console.log(url);
  fetch(`${url}books`)
    .then(res => res.json())
    .then(books =>
      dispatch({
        type: FETCH_BOOKS,
        payload: books
      })
    );
};
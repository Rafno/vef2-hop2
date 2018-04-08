import api from '../api';
import { FETCH_BOOKS, NEW_BOOK, BOOK_BY_ID } from './types';

export const fetchBooks = url => dispatch => {
  console.log(url);
  fetch(`${url}`)
    .then(res => res.json())
    .then(books =>
      dispatch({
        type: FETCH_BOOKS,
        payload: books
      })
    );
};
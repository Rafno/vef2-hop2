import api from '../api';
import { FETCH_BOOKS, NEW_BOOK, BOOK_BY_ID } from './types';

export const fetchBooks = url => dispatch => {
  const baseUrl = `https://verkefni2server.herokuapp.com${url}`;
    fetch(`${baseUrl}`)
    .then(res => res.json())
    .then(books =>
      dispatch({
        type: FETCH_BOOKS,
        payload: books,
      })
    );
};

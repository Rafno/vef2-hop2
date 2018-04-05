import api from '../api';
import { FETCH_BOOKS, NEW_BOOK } from './types';

export const fetchBooks = () => dispatch => {
  fetch('https://vefforritun2-h1-synilausn.herokuapp.com/books')
    .then(res => res.json())
    .then(books =>
      dispatch({
        type: FETCH_BOOKS,
        payload: books
      })
    );
};
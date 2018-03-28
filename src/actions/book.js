import api from '../api';

export const BOOK_REQUEST = 'BOOK_REQUEST';
export const BOOK_SUCCESS = 'BOOK_SUCCESS';
export const BOOK_FAILURE = 'BOOK_FAILURE';
// uppfæra, bæta við lestri, eyða lestri.
function requestBook() {
  return {
    type: BOOK_REQUEST,
    isFetching: true,
    message: null,
  }
}
function receiveBook(id) {
  return {
    type: BOOK_SUCCESS,
    isFetching: false,
    id,
    message: null,
  }
}

function BookError(message) {
  return {
    type: BOOK_FAILURE,
    isFetching: false,
    message
  }
}
// Thunk!

export const callBook = (bookId) => {
  return async (dispatch) => {
    dispatch(requestBook());

    let req;
    try {
      req = await api.get(bookId);
    } catch (e) {
      return dispatch(bookError(e))
    }
  }
}
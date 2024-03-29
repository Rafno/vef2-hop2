import { FETCH_BOOKS, BOOK_BY_ID } from '../actions/types';

const initialState = {
  items: [],
  idBook: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_BOOKS:
      return {
        ...state,
        bookItem: action.payload
      };
    case BOOK_BY_ID: {
      return {
        ...state,
        items: action.payload
      };
    }
    default:
      return state;
  }
}

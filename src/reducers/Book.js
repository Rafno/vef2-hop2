import { FETCH_BOOKS, NEW_BOOK } from '../actions/types';

const initialState = {
  items: [],
};

export default function (state = initialState, action) {
  console.log(action.payload);
  switch (action.type) {
    case FETCH_BOOKS:
    console.log('reducing');
      return {
        ...state,
        items: action.payload
      };
    default:
      return state;
  }
}
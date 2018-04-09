import { combineReducers } from 'redux'
import auth from './auth';
import Book from './Book';

export default combineReducers({
  books: Book,
  auth: auth,
});

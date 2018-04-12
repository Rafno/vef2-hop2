import {
  LOGIN_REQUEST, BOOK_REQUEST,
  LOGIN_SUCCESS, READ_REQUEST,
  BOOK_REGISTER_REQUEST, BOOK_PATCH_REQUEST,
  LOGIN_FAILURE, USER_PATCH_REQUEST,
  LOGIN_LOGOUT, VIEW_USERS,
  UPDATE_USER, SIGN_BOOK,
  BOOK_GET_REQUEST,
} from '../actions/types';
let user = null;
if (localStorage.getItem("Token")) {
  user = localStorage.getItem('user');
}
const initialState = user ? {
  message: 'no message',
  isFetching: false,
  isAuthenticated: true,
  user,
  token: localStorage.getItem('Token'),
} : {
    isFetching: false,
    isAuthenticated: false,
    user: null,
  };

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: state.isAuthenticated,
        user: action.user,
      };
    case BOOK_GET_REQUEST:
      return {
        ...state,
        isFetcinh: action.isFetching,
        isAuthenticated: state.isAuthenticated,
        payload: action.payload,
      }
    case BOOK_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: state.isAuthenticated,
        payload: action.payload,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("Token", `${action.payload}`);
      let breyta = localStorage.getItem('user');
      breyta = JSON.parse(breyta);
      let user = { 'username': breyta.username, 'password': breyta.password, "name": action.user.name, "id": action.user.identity };
      // Put the object into storage
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        token: action.payload,
      };
    case READ_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: state.isAuthenticated,
        message: action.message,
      };
    case BOOK_REGISTER_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: state.isAuthenticated,
        message: action.message,
      };
    case BOOK_PATCH_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: state.isAuthenticated,
        message: action.message,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.error,
      };
    case USER_PATCH_REQUEST:
    console.log(action);
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: state.isAuthenticated,
        message: action.message,
      };
    case LOGIN_LOGOUT:
      localStorage.removeItem("Token");
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
      }
    case VIEW_USERS:
      return {
        ...state,
        isAuthenticated: state.isAuthenticated,
        users: action.users,
      }
    case UPDATE_USER:
      return {
        ...state,
        isAuthenticated: state.isAuthenticated,
        picture: action.picture,
      }
    case SIGN_BOOK:
      return {
        ...state,
        isAuthenticated: state.isAuthenticated,
        signReadBook: state.signReadBook,
      }
    default:
      return state;
  }
};

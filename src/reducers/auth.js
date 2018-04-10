import { LOGIN_REQUEST, BOOK_REQUEST, LOGIN_SUCCESS, READ_REQUEST, BOOK_REGISTER_REQUEST, BOOK_PATCH_REQUEST, LOGIN_FAILURE, USER_PATCH_REQUEST, LOGIN_LOGOUT } from '../actions/types';
let user = null;
if (localStorage.getItem("Token")) {
  user = localStorage.getItem('user');
}
const initialState = user ? {
  isFetching: false,
  isAuthenticated: true,
  user,
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
      let user = { 'username': breyta.username, 'password': breyta.password, "name": action.user.name };
      // Put the object into storage
      localStorage.setItem('user', JSON.stringify(user));
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        payload: action.payload,
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
        message: action.payload,
      };
    case USER_PATCH_REQUEST:
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
    default:
      return state;
  }
};

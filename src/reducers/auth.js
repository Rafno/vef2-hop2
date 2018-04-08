import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_LOGOUT, LOGIN_SUCCESS } from '../actions/types';

const user = JSON.parse(localStorage.getItem('user') || 'null');
const initialState = {
  isFetching: false,
  isAuthenticated: user ? true : false,
  user:user
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem("Token", action.payload);
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        user: action.user,
        message: action.payload,
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        isFetching: action.isFetching,
        isAuthenticated: action.isAuthenticated,
        message: action.message
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

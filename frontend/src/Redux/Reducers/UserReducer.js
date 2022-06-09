import {
  ADD_USER_DETAIL,
  ADD_USER_TOKEN,
  REMOVE_USER_DETAIL,
  REMOVE_USER_TOKEN,
  USER_CONFIRMATION_FAIL,
  USER_CONFIRMATION_REQUEST,
  USER_CONFIRMATION_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../Constants/UserConstants";

export const userLoginReducer = (state = { isLoggedIn: false, errorLogin: null }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, isLoggedIn: true };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, errorLogin: action.payload, isLoggedIn: false };
    default:
      return state;
  }
};

export const userRegisterReducer = (state = { registerMessage: "", errorRegister: null }, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { ...state, loading: true, registerMessage: "" };
    case USER_REGISTER_SUCCESS:
      return { ...state, loading: false, registerMessage: action.payload };
    case USER_REGISTER_FAIL:
      return { ...state, loading: false, errorRegister: action.payload };
    default:
      return state;
  }
};

export const userConfirmReducer = (state = { confirmMessage: "", errorConfirm: null }, action) => {
  switch (action.type) {
    case USER_CONFIRMATION_REQUEST:
      return { ...state, loading: true, confirmMessage: "" };
    case USER_CONFIRMATION_SUCCESS:
      return { ...state, loading: false, confirmMessage: action.payload };
    case USER_CONFIRMATION_FAIL:
      return { ...state, loading: false, errorConfirm: action.payload };
    default:
      return state;
  }
};

export const userLogoutReducer = (state = { isLoggedOut: false, errorLogout: null, logoutMessage: "" }, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return { ...state, loading: true };
    case USER_LOGOUT_SUCCESS:
      return { ...state, loading: false, isLoggedOut: true, logoutMessage: action.payload };
    case USER_LOGOUT_FAIL:
      return { ...state, loading: false, errorLogout: action.payload };
    default:
      return state;
  }
};

export const userTokenReducer = (state = { info: {} }, action) => {
  switch (action.type) {
    case ADD_USER_TOKEN:
      return { ...state, info: action.payload };
    case REMOVE_USER_TOKEN:
      return {
        ...state,
        info: action.payload,
      };
    default:
      return state;
  }
};

export const userDetailReducer = (state = { info: {} }, action) => {
  switch (action.type) {
    case ADD_USER_DETAIL:
      return { ...state, info: action.payload };
    case REMOVE_USER_DETAIL:
      return { ...state, info: action.payload };
    default:
      return state;
  }
};

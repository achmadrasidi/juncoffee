import {
  ADD_USER_INFO,
  REMOVE_USER_INFO,
  RESET_STATE,
  USER_CONFIRMATION_FAIL,
  USER_CONFIRMATION_REQUEST,
  USER_CONFIRMATION_SUCCESS,
  USER_HISTORY_FAIL,
  USER_HISTORY_REQUEST,
  USER_HISTORY_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT_FAIL,
  USER_LOGOUT_REQUEST,
  USER_LOGOUT_SUCCESS,
  USER_PAYMENT_FAIL,
  USER_PAYMENT_REQUEST,
  USER_PAYMENT_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
} from "../Constants/UserConstants";

export const userLoginReducer = (state = { isLoggedIn: false, errorLogin: null, message: "" }, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { ...state, loading: true, errorLogin: null, isLoggedIn: false };
    case USER_LOGIN_SUCCESS:
      return { ...state, loading: false, isLoggedIn: true, errorLogin: null, message: action.payload };
    case USER_LOGIN_FAIL:
      return { ...state, loading: false, errorLogin: action.payload, isLoggedIn: false };
    case RESET_STATE:
      return { ...state, isLoggedIn: false, errorLogin: null, message: "" };
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
    case RESET_STATE:
      return { ...state, registerMessage: "", errorRegister: null };
    default:
      return state;
  }
};

export const userConfirmReducer = (state = { confirmMessage: "", errorConfirm: null }, action) => {
  switch (action.type) {
    case USER_CONFIRMATION_REQUEST:
      return { ...state, loading: true };
    case USER_CONFIRMATION_SUCCESS:
      return { ...state, loading: false, confirmMessage: action.payload };
    case USER_CONFIRMATION_FAIL:
      return { ...state, loading: false, errorConfirm: action.payload };
    case RESET_STATE:
      return { ...state, confirmMessage: null, errorConfirm: null };
    default:
      return state;
  }
};

export const userLogoutReducer = (state = { isLoggedOut: false, errorLogout: null, logoutMessage: "" }, action) => {
  switch (action.type) {
    case USER_LOGOUT_REQUEST:
      return { ...state, loading: true, logoutMessage: "", errorLogout: null, isLoggedOut: false };
    case USER_LOGOUT_SUCCESS:
      return { ...state, loading: false, isLoggedOut: true, logoutMessage: action.payload, errorLogout: null };
    case USER_LOGOUT_FAIL:
      return { ...state, loading: false, errorLogout: action.payload, logoutMessage: "", isLoggedOut: false };
    case RESET_STATE:
      return { ...state, isLoggedOut: false, errorLogout: null, logoutMessage: "" };
    default:
      return state;
  }
};

export const userInfoReducer = (state = { info: {} }, action) => {
  switch (action.type) {
    case ADD_USER_INFO:
      return { ...state, info: { ...state.info, ...action.payload }, isLoggedIn: true };
    case REMOVE_USER_INFO:
      return {
        ...state,
        info: action.payload,
        isLoggedIn: false,
      };
    default:
      return state;
  }
};

export const userPaymentReducer = (state = { message: "", error: null, loading: false }, action) => {
  switch (action.type) {
    case USER_PAYMENT_REQUEST:
      return { ...state, loading: true };
    case USER_PAYMENT_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case USER_PAYMENT_FAIL:
      return { ...state, loading: false, error: action.payload };
    case RESET_STATE:
      return { ...state, message: "", error: null, loading: false };
    default:
      return state;
  }
};

export const userHistoryReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case USER_HISTORY_REQUEST:
      return { ...state, loading: true };
    case USER_HISTORY_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case USER_HISTORY_FAIL:
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};

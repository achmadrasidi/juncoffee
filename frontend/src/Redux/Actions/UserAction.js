import axios from "axios";
import storage from "redux-persist/lib/storage";
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

export const userRegister =
  ({ email, password, phone_number }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_REGISTER_REQUEST });
      const body = {
        email,
        password,
        phone_number,
      };
      const result = await axios.post(`${process.env.REACT_APP_API}/auth/register`, body);
      const { message } = result.data;
      dispatch({ type: USER_REGISTER_SUCCESS, payload: message });
    } catch (error) {
      dispatch({ type: USER_REGISTER_FAIL, payload: error.response ? error.response.data.message : error.message });
    }
  };

export const userLogin =
  ({ email, password }) =>
  async (dispatch) => {
    try {
      dispatch({ type: USER_LOGIN_REQUEST });
      const body = {
        email,
        password,
      };
      const result = await axios.post(`${process.env.REACT_APP_API}/auth/login`, body);
      const data = result.data;
      const { id, token, image, address, phone_number } = data;
      dispatch({ type: USER_LOGIN_SUCCESS });
      dispatch({ type: ADD_USER_TOKEN, payload: { id, email, token } });
      dispatch({ type: ADD_USER_DETAIL, payload: { image, address, phone_number } });
    } catch (error) {
      dispatch({ type: USER_LOGIN_FAIL, payload: error.response ? error.response.data.error : error.message });
    }
  };

export const userConfirm = (token) => async (dispatch) => {
  try {
    dispatch({ type: USER_CONFIRMATION_REQUEST });
    const result = await axios.get(`${process.env.REACT_APP_API}/auth/confirm/${token}`);
    const { message } = result.data;

    dispatch({ type: USER_CONFIRMATION_SUCCESS, payload: message });
  } catch (error) {
    dispatch({ type: USER_CONFIRMATION_FAIL, payload: error.response ? error.response.data.message : error.message });
  }
};

export const userLogout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });

    const { token } = getState().persist.userToken.info;
    const result = await axios.delete(`${process.env.REACT_APP_API}/auth/logout`, { headers: { Authorization: `Bearer ${token}` } });

    dispatch({ type: USER_LOGOUT_SUCCESS, payload: result.data.message });
    dispatch({ type: REMOVE_USER_DETAIL, payload: {} });
    dispatch({ type: REMOVE_USER_TOKEN, payload: {} });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

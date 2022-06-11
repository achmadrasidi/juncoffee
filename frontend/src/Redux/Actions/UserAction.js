import axios from "axios";
import {
  ADD_USER_INFO,
  REMOVE_USER_INFO,
  RESET_STATE,
  USER_CONFIRMATION_FAIL,
  USER_CONFIRMATION_REQUEST,
  USER_CONFIRMATION_SUCCESS,
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
      dispatch({ type: USER_REGISTER_FAIL, payload: error.response ? error.response.data.error : error.message });
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
      const { id, token, image, address, phone_number, role } = data;
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.message });
      dispatch({ type: ADD_USER_INFO, payload: { id, email, token, image, address, phone_number, role } });
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
    dispatch({ type: USER_CONFIRMATION_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const userLogout = () => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_LOGOUT_REQUEST });

    const { token } = getState().persist.userInfo.info;
    const result = await axios.delete(`${process.env.REACT_APP_API}/auth/logout`, { headers: { Authorization: `Bearer ${token}` } });

    dispatch({ type: USER_LOGOUT_SUCCESS, payload: result.data.message });
    dispatch({ type: REMOVE_USER_INFO, payload: {} });
  } catch (error) {
    dispatch({ type: USER_LOGOUT_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const userPayment = (payToken) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_PAYMENT_REQUEST });
    const { token } = getState().persist.userInfo.info;
    const result = await axios.get(`${process.env.REACT_APP_API}/auth/payment/${payToken}`, { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: USER_PAYMENT_SUCCESS, payload: result.data.message });
  } catch (error) {
    dispatch({ type: USER_PAYMENT_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const resetState = () => (dispatch) => {
  dispatch({ type: RESET_STATE, payload: null });
};

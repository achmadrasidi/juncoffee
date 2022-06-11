import axios from "axios";
import { CREATE_TRANSACTION_FAIL, CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, RESET_ORDER, TRANSACTION_SUMMARY_FAIL, TRANSACTION_SUMMARY_REQUEST, TRANSACTION_SUMMARY_SUCCESS } from "../Constants/OrderConstants";

export const createOrder = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_TRANSACTION_REQUEST,
    });
    const { token } = getState().persist.userInfo.info;
    const result = await axios.post(`${process.env.REACT_APP_API}/user/new-order/`, body, { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: CREATE_TRANSACTION_SUCCESS, payload: result.data.message });
  } catch (error) {
    dispatch({ type: CREATE_TRANSACTION_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const resetOrder = () => (dispatch) => {
  dispatch({ type: RESET_ORDER, payload: null });
};

export const getTransaction = (token) => async (dispatch) => {
  try {
    dispatch({ type: TRANSACTION_SUMMARY_REQUEST });
    const result = await axios.get(`${process.env.REACT_APP_API}/transaction/summary`, { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: TRANSACTION_SUMMARY_SUCCESS, payload: result.data.data });
  } catch (error) {
    dispatch({ type: TRANSACTION_SUMMARY_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

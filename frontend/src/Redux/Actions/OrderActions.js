import axios from "axios";
import { EMPTY_CART } from "../Constants/CartConstants";
import { CREATE_TRANSACTION_FAIL, CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS } from "../Constants/OrderConstants";

export const createOrder = (body) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_TRANSACTION_REQUEST,
    });
    const { token } = getState().persist.userToken.info;
    const result = await axios.post(`${process.env.REACT_APP_API}/user/new-order/`, body, { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: CREATE_TRANSACTION_SUCCESS, payload: result.data.message });
    dispatch({ type: EMPTY_CART, payload: [] });
  } catch (error) {
    dispatch({ type: CREATE_TRANSACTION_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

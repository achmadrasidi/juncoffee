import axios from "axios";
import { DELETE_ALL_HISTORY_FAIL, DELETE_ALL_HISTORY_REQUEST, DELETE_ALL_HISTORY_SUCCESS, DELETE_HISTORY_FAIL, DELETE_HISTORY_REQUEST, DELETE_HISTORY_SUCCESS } from "../Constants/HistoryConstants";

export const deleteHistory = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_HISTORY_REQUEST });
    const { token } = getState().persist.userInfo.info;
    const result = await axios.delete(`${process.env.REACT_APP_API}/user/history/${id}`, { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: DELETE_HISTORY_SUCCESS, payload: result.data.message });
  } catch (error) {
    dispatch({ type: DELETE_HISTORY_FAIL, payload: error.response ? error.reponse.data.error : error.message });
  }
};

export const deleteAllHistory = () => async (dispatch, getState) => {
  try {
    dispatch({ type: DELETE_ALL_HISTORY_REQUEST });
    const { token } = getState().persist.userInfo.info;
    const result = await axios.delete(`${process.env.REACT_APP_API}/user/history/`, { headers: { Authorization: `Bearer ${token}` } });
    dispatch({ type: DELETE_ALL_HISTORY_SUCCESS, payload: result.data.message });
  } catch (error) {
    dispatch({ type: DELETE_ALL_HISTORY_FAIL, payload: error.response ? error.reponse.data.error : error.message });
  }
};

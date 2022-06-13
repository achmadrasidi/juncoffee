import { DELETE_ALL_HISTORY_FAIL, DELETE_ALL_HISTORY_REQUEST, DELETE_ALL_HISTORY_SUCCESS, DELETE_HISTORY_FAIL, DELETE_HISTORY_REQUEST, DELETE_HISTORY_SUCCESS } from "../Constants/HistoryConstants";

export const deleteHistoryReducer = (state = { mes: "" }, action) => {
  switch (action.type) {
    case DELETE_HISTORY_REQUEST:
      return { ...state, load: true };
    case DELETE_HISTORY_SUCCESS:
      return { ...state, load: false, mes: action.payload };
    case DELETE_HISTORY_FAIL:
      return { ...state, load: false, errr: action.payload };
    default:
      return state;
  }
};

export const deleteAllHistoryReducer = (state = { msg: "" }, action) => {
  switch (action.type) {
    case DELETE_ALL_HISTORY_REQUEST:
      return { ...state, lo: true, error: null };
    case DELETE_ALL_HISTORY_SUCCESS:
      return { ...state, lo: false, msg: action.payload };
    case DELETE_ALL_HISTORY_FAIL:
      return { ...state, lo: false, er: action.payload };
    default:
      return state;
  }
};

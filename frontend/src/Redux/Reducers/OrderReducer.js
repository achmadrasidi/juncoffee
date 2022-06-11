import { CREATE_TRANSACTION_FAIL, CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS, RESET_ORDER, TRANSACTION_SUMMARY_FAIL, TRANSACTION_SUMMARY_REQUEST, TRANSACTION_SUMMARY_SUCCESS } from "../Constants/OrderConstants";

export const createOrderReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case CREATE_TRANSACTION_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case CREATE_TRANSACTION_FAIL:
      return { ...state, loading: false, err: action.payload };
    case RESET_ORDER:
      return { ...state, message: "" };
    default:
      return state;
  }
};

export const getTransaction = (state = { data: [] }, action) => {
  switch (action.type) {
    case TRANSACTION_SUMMARY_REQUEST:
      return { ...state, loading: true };
    case TRANSACTION_SUMMARY_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case TRANSACTION_SUMMARY_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

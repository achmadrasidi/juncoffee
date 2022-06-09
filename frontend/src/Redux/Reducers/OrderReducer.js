import { CREATE_TRANSACTION_FAIL, CREATE_TRANSACTION_REQUEST, CREATE_TRANSACTION_SUCCESS } from "../Constants/OrderConstants";

export const createOrderReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case CREATE_TRANSACTION_REQUEST:
      return { ...state, loading: true };
    case CREATE_TRANSACTION_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case CREATE_TRANSACTION_FAIL:
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};

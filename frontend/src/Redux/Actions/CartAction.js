import { ADD_TO_CART, EMPTY_CART, REMOVE_CART_ITEM } from "../Constants/CartConstants";

export const addToCart = (size, quantity, prodPrice) => (dispatch, getState) => {
  const { product } = getState().productDetail;
  const variant = [{ size, quantity, prodPrice }];
  const data = { product, variant };
  dispatch({ type: ADD_TO_CART, payload: data });
};

export const removeCart = (item) => (dispatch) => {
  dispatch({
    type: REMOVE_CART_ITEM,
    payload: item,
  });
};

export const emptyCart = () => (dispatch) => {
  dispatch({
    type: EMPTY_CART,
    payload: [],
  });
};

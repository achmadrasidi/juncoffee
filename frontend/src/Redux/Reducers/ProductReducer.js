import {
  HOME_PRODUCT_FAV_REQUEST,
  HOME_PRODUCT_FAV_SUCCESS,
  HOME_PRODUCT_FAV_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
} from "../Constants/ProductConstants";

export const productFavHomeReducer = (state = { data: [] }, action) => {
  switch (action.type) {
    case HOME_PRODUCT_FAV_REQUEST:
      return { ...state, loading: true, data: [] };
    case HOME_PRODUCT_FAV_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case HOME_PRODUCT_FAV_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productListReducer = (state = { list: { data: [], meta: {} } }, action) => {
  switch (action.type) {
    case PRODUCT_LIST_REQUEST:
      return { ...state, loading: true, list: {} };
    case PRODUCT_LIST_SUCCESS:
      return { ...state, loading: false, list: action.payload, error: null };
    case PRODUCT_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDetailReducer = (state = { product: [] }, action) => {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST:
      return { ...state, loading: true, product: [] };
    case PRODUCT_DETAIL_SUCCESS:
      const { price } = action.payload;
      const newPrice = Number(price.split("Rp")[1].split(".").join(""));
      const newData = { ...action.payload, price: newPrice };
      return { ...state, loading: false, product: newData };
    case PRODUCT_DETAIL_FAIL:
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};

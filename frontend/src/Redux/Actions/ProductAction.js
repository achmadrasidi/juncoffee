import axios from "axios";
import {
  HOME_PRODUCT_FAV_FAIL,
  HOME_PRODUCT_FAV_REQUEST,
  HOME_PRODUCT_FAV_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
} from "../Constants/ProductConstants";

export const productFavHome = () => async (dispatch) => {
  try {
    dispatch({ type: HOME_PRODUCT_FAV_REQUEST });
    const result = await axios.get(`${process.env.REACT_APP_API}/product/favourite?limit=3`);
    const { data } = result.data;
    dispatch({ type: HOME_PRODUCT_FAV_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: HOME_PRODUCT_FAV_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const productList = (baseUrl) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_LIST_REQUEST });
    const result = await axios.get(baseUrl);
    const { data, meta } = result.data;
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: { data, meta } });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const productDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: PRODUCT_DETAIL_REQUEST });
    const response = await axios.get(`${process.env.REACT_APP_API}/product/detail/${id}`);
    const data = response.data.data;
    dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

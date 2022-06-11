import axios from "axios";
import {
  PASSWORD_UPDATE_FAIL,
  PASSWORD_UPDATE_REQUEST,
  PASSWORD_UPDATE_SUCCESS,
  PROFILE_FAIL,
  PROFILE_REQUEST,
  PROFILE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  RESET_PROFILE_STATE,
} from "../Constants/ProfileConstants";
import { ADD_USER_INFO } from "../Constants/UserConstants";

export const getProfile = (token) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_REQUEST });
    const result = await axios.get(`${process.env.REACT_APP_API}/user/profile`, { headers: { Authorization: `Bearer ${token}` } });
    const { data } = result.data;
    const { email, phone_number, date_of_birth, image, address } = data;
    const detail = {
      email,
      phone_number,
      image,
      address,
    };
    let newData = data;

    if (!!date_of_birth) {
      const year = date_of_birth.split("-")[2];
      const month = date_of_birth.split("-")[1];
      const day = date_of_birth.split("-")[0];
      newData = { ...data, year, month, day };
    }

    dispatch({ type: PROFILE_SUCCESS, payload: newData });
    dispatch({ type: ADD_USER_INFO, payload: detail });
  } catch (error) {
    dispatch({ type: PROFILE_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const patchProfile = (token, body) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });
    const formData = new FormData();
    for (const key in body) {
      formData.append(key, body[key]);
    }
    const result = await axios.patch(`${process.env.REACT_APP_API}/user/edit-profile/`, formData, { headers: { Authorization: `Bearer ${token}`, "Content-Type": "multipart/form-data" } });
    const { data } = result.data;
    const { email, phone_number, image, address } = data;
    const detail = {
      email,
      phone_number,
      image,
      address,
    };

    dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: result.data.message });
    dispatch({ type: ADD_USER_INFO, payload: detail });
  } catch (error) {
    dispatch({ type: PROFILE_UPDATE_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const patchPassword = (body, token) => async (dispatch) => {
  try {
    dispatch({ type: PASSWORD_UPDATE_REQUEST });
    const result = await axios.patch(`${process.env.REACT_APP_API}/user/edit-password/`, body, { headers: { Authorization: `Bearer ${token}` } });
    const { message } = result.data;
    dispatch({ type: PASSWORD_UPDATE_SUCCESS, payload: message });
  } catch (error) {
    dispatch({ type: PASSWORD_UPDATE_FAIL, payload: error.response ? error.response.data.error : error.message });
  }
};

export const resetProfile = () => (dispatch) => {
  dispatch({ type: RESET_PROFILE_STATE, payload: null });
};

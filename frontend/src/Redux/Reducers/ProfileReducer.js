import { PASSWORD_UPDATE_FAIL, PASSWORD_UPDATE_REQUEST, PASSWORD_UPDATE_SUCCESS, PROFILE_FAIL, PROFILE_REQUEST, PROFILE_SUCCESS, PROFILE_UPDATE_FAIL, PROFILE_UPDATE_REQUEST, PROFILE_UPDATE_SUCCESS } from "../Constants/ProfileConstants";

export const getProfileReducer = (state = { data: { newData: {} } }, action) => {
  switch (action.type) {
    case PROFILE_REQUEST:
      return { ...state, loading: true, data: {} };
    case PROFILE_SUCCESS:
      return { ...state, loading: false, data: action.payload };
    case PROFILE_FAIL:
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};

export const patchProfileReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case PROFILE_UPDATE_REQUEST:
      return { ...state, load: true };
    case PROFILE_UPDATE_SUCCESS:
      return { ...state, load: false, message: action.payload };
    case PROFILE_UPDATE_FAIL:
      return { ...state, load: false, er: action.payload };
    default:
      return state;
  }
};

export const patchPasswordReducer = (state = { message: "" }, action) => {
  switch (action.type) {
    case PASSWORD_UPDATE_REQUEST:
      return { ...state, loading: true };
    case PASSWORD_UPDATE_SUCCESS:
      return { ...state, loading: false, message: action.payload };
    case PASSWORD_UPDATE_FAIL:
      return { ...state, loading: false, err: action.payload };
    default:
      return state;
  }
};

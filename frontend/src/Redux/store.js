import { userConfirmReducer, userInfoReducer, userLoginReducer, userLogoutReducer, userPaymentReducer, userRegisterReducer } from "./Reducers/UserReducer";
import { combineReducers } from "redux";
import thunk from "redux-thunk";
import { configureStore } from "@reduxjs/toolkit";
import { productDetailReducer, productFavHomeReducer, productListReducer } from "./Reducers/ProductReducer";
import { getProfileReducer, patchPasswordReducer, patchProfileReducer } from "./Reducers/ProfileReducer";
import { cartReducer } from "./Reducers/cartReducer";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import autoMergeLevel2 from "redux-persist/es/stateReconciler/autoMergeLevel2";
import { createOrderReducer, getTransaction } from "./Reducers/OrderReducer";
import { searchReducer } from "./Reducers/SearchReducer";

const persistConfig = {
  key: "user",
  storage,
  stateReconciler: autoMergeLevel2,
  blacklist: ["productDetail"],
};

const combineReducer = combineReducers({ userInfo: userInfoReducer, cartInfo: cartReducer });

const persistedReducer = persistReducer(persistConfig, combineReducer);

const middleware = [thunk];

export const store = configureStore({
  reducer: {
    persist: persistedReducer,
    userLogin: userLoginReducer,
    userLogout: userLogoutReducer,
    userConfirm: userConfirmReducer,
    userRegist: userRegisterReducer,
    productHome: productFavHomeReducer,
    getProfile: getProfileReducer,
    patchProfile: patchProfileReducer,
    patchPassword: patchPasswordReducer,
    productList: productListReducer,
    productDetail: productDetailReducer,
    createOrder: createOrderReducer,
    userPayment: userPaymentReducer,
    searchKeyword: searchReducer,
    transactionSum: getTransaction,
  },
  middleware,
  devTools: true,
});

export const persistor = persistStore(store);

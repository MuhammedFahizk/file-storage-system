// store.js or redux/store.js

import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage
import authReducer from '../Redux/feathers/auth';
import userReducer from '../Redux/feathers/userSlice';
import { combineReducers } from "redux";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth", "user"], // only persist auth slice
};

const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  // other reducers
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

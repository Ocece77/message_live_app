import { combineReducers, configureStore } from "@reduxjs/toolkit";
import messageSlice from "./messageSlice";
import storage from "redux-persist/lib/storage";
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";


 const rootReducer = combineReducers({
  message : messageSlice
})

const persistConfig = {
  key: 'root',
  storage,
  version: 1,
};


const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }), //prevention des erreur
});

export const persistor = persistStore(store);
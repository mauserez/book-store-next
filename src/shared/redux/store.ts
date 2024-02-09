"use client";

import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { catalogReducer, cartReducer /* , authReducer */ } from "./reducers";

import { persistReducer, persistStore } from "redux-persist";
import storage from "./nextStorage";

import {
	FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from "redux-persist";

const catalogPersistConfig = {
	key: "catalog",
	storage: storage,
	whitelist: ["filter"],
};

const rootReducer = combineReducers({
	catalog: persistReducer(catalogPersistConfig, catalogReducer),
	cart: cartReducer,
	//auth: persistReducer(authReducerPersistConfig, authReducer),
});

const rootPersistConfig = {
	key: "root",
	storage: storage,
};

export default persistReducer(rootPersistConfig, rootReducer);

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER],
			},
		});
	},
});

setupListeners(store.dispatch);

export const appStore = store;
export const appPersistor = persistStore(appStore);

export type AppStore = typeof appStore;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;

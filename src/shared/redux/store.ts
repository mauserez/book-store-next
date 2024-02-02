"use client";
import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { catalogReducer } from "./reducers";

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

const catalogReducerPersistConfig = {
	key: "catalog",
	storage: storage,
	blacklist: ["apiStatus", "startIndex", "items"],
};

const rootReducer = combineReducers({
	catalog: persistReducer(catalogReducerPersistConfig, catalogReducer),
});

const rootPersistConfig = {
	key: "root",
	storage: storage,
};

export default persistReducer(rootPersistConfig, rootReducer);

//export const makeStore = (preloadedState?: Partial<RootState>) => {
const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => {
		return getDefaultMiddleware({
			serializableCheck: {
				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PURGE, PERSIST, REGISTER],
			},
		});
	},
	//wpreloadedState,
});

setupListeners(store.dispatch);

/*
	setupListeners(store.dispatch);
	return store;
}; */

export const appStore = store; //makeStore();
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

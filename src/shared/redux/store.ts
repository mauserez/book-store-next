import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import { catalogSlice } from "./slices/catalogSlice";

const rootReducer = combineSlices(catalogSlice,);

export const makeStore = (preloadedState?: Partial<RootState>) => {
	const store = configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) => {
			return getDefaultMiddleware();
		},
		preloadedState,
	});

	setupListeners(store.dispatch);
	return store;
};

export const appStore = makeStore();

export type AppStore = typeof appStore;
export type AppDispatch = AppStore["dispatch"];
export type RootState = ReturnType<typeof rootReducer>;

export type AppThunk<ThunkReturnType = void> = ThunkAction<
	ThunkReturnType,
	RootState,
	unknown,
	Action
>;

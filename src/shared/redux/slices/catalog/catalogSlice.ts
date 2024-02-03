"use client";

import { CatalogApiProps, ItemDataType } from "@/src/app/api/catalog/route";

import { createAppSlice } from "../../createAppSlice";
import { type PayloadAction } from "@reduxjs/toolkit";
import { getBooks } from "./asyncThunks";

export type ApiStatusType =
	| "idle"
	| "loading"
	| "loading-more"
	| "failed"
	| "nomore";

export type LoadType = "redraw" | "loadmore";

type CatalogInitStateType = {
	items: ItemDataType[];
	apiStatus: ApiStatusType;
	startIndex: number;
	filter: Omit<CatalogApiProps, "startIndex">;
	loadType: LoadType;
};

const initialState: CatalogInitStateType = {
	items: [],
	apiStatus: "idle",
	loadType: "redraw",
	startIndex: 0,
	filter: {
		q: "subject:Architecture",
		printType: "books",
		maxResults: 6,
		langRestrict: "en",
	},
};

export const catalogSlice = createAppSlice({
	name: "catalog",
	initialState,
	reducers: (create) => ({
		setFilter: create.reducer(
			(state, action: PayloadAction<CatalogApiProps>) => {
				state.filter = { ...state.filter, ...action.payload };
			}
		),
		setStartIndex: create.reducer((state, action: PayloadAction<number>) => {
			state.startIndex = action.payload;
		}),
	}),
	extraReducers: (builder) => {
		builder.addCase(getBooks.pending, (state, action) => {
			if (action.meta.arg === "loadmore") {
				state.apiStatus = "loading-more";
			} else {
				state.apiStatus = "loading";
			}
		});
		builder.addCase(getBooks.fulfilled, (state, action) => {
			if (!action.payload) {
				state.apiStatus = "nomore";
			} else {
				if (action.meta.arg === "loadmore") {
					state.items = [...state.items, ...action.payload];
				} else {
					state.items = action.payload;
				}

				state.apiStatus = "idle";
			}
		});
	},

	selectors: {
		selectApiStatus: (state) => state.apiStatus,
		selectItems: (state) => state.items,
		selectFilter: (state) => state.filter,
		selectFilterCategory: (state) => state.filter.q,
	},
});

export const { setStartIndex, setFilter } = catalogSlice.actions;

export const {
	selectApiStatus,
	selectItems,
	selectFilter,
	selectFilterCategory,
} = catalogSlice.selectors;

const catalogReducer = catalogSlice.reducer;

export default catalogReducer;

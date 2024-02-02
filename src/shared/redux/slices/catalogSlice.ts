"use client";

import { CatalogApiProps, ItemDataType } from "@/src/app/api/catalog/route";

import { RootState } from "../store";
import { createAppSlice } from "../createAppSlice";
import { type PayloadAction } from "@reduxjs/toolkit";

type ApiStatusType = "idle" | "loading" | "loading-more" | "failed";
type LoadType = "redraw" | "loadmore";

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

const isLoading = (status: ApiStatusType) => {
	return ["loading", "loading-more"].includes(status);
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
		getBooks: create.asyncThunk(
			async (type: LoadType, Store) => {
				const { catalog } = Store.getState() as RootState;

				if (!isLoading(catalog.apiStatus)) {
					return;
				}
				let newStartIndex = 0;

				if (type === "redraw") {
					Store.dispatch(setStartIndex(0));
				}

				if (type === "loadmore") {
					const startIndex = catalog.startIndex;
					const maxResults = catalog.filter.maxResults
						? catalog.filter.maxResults
						: 6;
					newStartIndex = startIndex + maxResults;

					Store.dispatch(setStartIndex(newStartIndex));
				}

				const filter = { ...catalog.filter, startIndex: newStartIndex };

				const res = await fetch("/api/catalog", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(filter),
				});

				const data = await res.json();
				

				return data;
			},
			{
				pending: (state, action) => {
					if (action.meta.arg === "loadmore") {
						state.apiStatus = "loading-more";
					} else {
						state.apiStatus = "loading";
					}
				},
				fulfilled: (state, action) => {
					console.log(state.apiStatus);
					if (isLoading(state.apiStatus)) {
						if (action.meta.arg === "loadmore") {
							state.items.push(action.payload.items);
						} else {
							state.items = action.payload.items;
						}
					}
					state.apiStatus = "idle";
				},
				rejected: (state) => {
					state.apiStatus = "failed";
				},
			}
		),
	}),

	selectors: {
		selectApiStatus: (state) => state.apiStatus,
		selectItems: (state) => state.items,
		selectFilter: (state) => state.filter,
		selectFilterCategory: (state) => state.filter.q,
	},
});

export const { setStartIndex, setFilter, getBooks } = catalogSlice.actions;

export const {
	selectApiStatus,
	selectItems,
	selectFilter,
	selectFilterCategory,
} = catalogSlice.selectors;

const catalogReducer = catalogSlice.reducer;

export default catalogReducer;

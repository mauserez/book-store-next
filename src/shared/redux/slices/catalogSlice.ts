import {
	CatalogApiProps,
	CatalogApiResponseType,
	ItemDataType,
} from "@/src/app/api/catalog/route";

import type { PayloadAction } from "@reduxjs/toolkit";
import { createAppSlice } from "../createAppSlice";
import { RootState } from "../store";
import axios from "axios";

type ApiStatusType = "idle" | "loading" | "failed";
type CatalogInitStateType = {
	items: ItemDataType[];
	apiStatus: ApiStatusType;
	filter: CatalogApiProps;
};

const initialState: CatalogInitStateType = {
	items: [],
	apiStatus: "idle",
	filter: {
		q: "subject:Architecture",
		printType: "books",
		startIndex: 0,
		maxResults: 6,
		langRestrict: "en",
	},
};

export const catalogSlice = createAppSlice({
	name: "catalog",
	initialState,
	reducers: (create) => ({
		/* getBooks: create.reducer((state, action: PayloadAction<ApiProps>) => {
			state.apiStatus = "loading";
			state.filter = { ...action.payload, startIndex: 0 };
			state.items = await axios.get("/api/catalog");
		}), */
		loadMoreBooks: create.reducer((state, action: PayloadAction<number>) => {
			state.apiStatus = "loading";
			const currentStartIndex = state.filter.startIndex ?? 0;
			const currentMaxResults = state.filter.startIndex ?? 6;
			state.filter.startIndex = currentStartIndex + currentMaxResults;
		}),
		getBooks: create.asyncThunk(
			async (filters: CatalogApiProps, { getState }) => {
				const state = getState() as RootState;
				const catalogState = state.catalog ?? initialState;
				catalogState.filter = filters;

				// The value we return becomes the `fulfilled` action payload
				return await axios.post<CatalogApiResponseType>("/api/catalog");
			},
			{
				pending: (state) => {
					state.apiStatus = "loading";
				},
				fulfilled: (state, action) => {
					state.apiStatus = "idle";
					state.items = action.payload.data.items;
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
	},
});

export const { getBooks, loadMoreBooks } = catalogSlice.actions;
export const { selectApiStatus, selectItems } = catalogSlice.selectors;

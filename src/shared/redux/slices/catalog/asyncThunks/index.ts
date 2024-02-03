import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	setStartIndex,
	type LoadType,
	type ApiStatusType,
} from "../catalogSlice";
import axios from "axios";

import { RootState } from "../../../store";
import { ItemDataType } from "@/src/app/api/catalog/route";

const isLoading = (status: ApiStatusType) => {
	return ["loading", "loading-more"].includes(status);
};

export const getBooks = createAsyncThunk(
	"catalog/getBooks",
	async (type: LoadType, Store) => {
		const { catalog } = Store.getState() as RootState;

		if (!isLoading(catalog.apiStatus)) {
			return;
		}

		let newStartIndex = 0;

		if (type === "redraw") {
			Store.dispatch(setStartIndex(newStartIndex));
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

		return axios
			.post<ItemDataType[]>("/api/catalog", filter)
			.then((response) => {
				return response.data;
			});
	}
);

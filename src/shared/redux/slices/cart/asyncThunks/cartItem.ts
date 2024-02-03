import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
import { ItemDataType } from "@/src/app/api/catalog/route";
import { RootState } from "../../../store";
import axiosJsonServer from "@/src/shared/axios";

export const isCartItemExist = async (itemId: string) => {
	return axiosJsonServer
		.get<CartItemType[]>(`/cart/${itemId}`)
		.then((response) => {
			console.log("Already exists");
			return response.data ?? [];
		})
		.catch((error) => {
			console.log("Not exists", error);
			return null;
		});
};

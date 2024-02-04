import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
import { ItemDataType } from "@/src/app/api/catalog/route";
import { RootState } from "../../../store";
import axiosJsonServer from "@/src/shared/axios";

export const isCartItemExists = async (itemId: string) => {
	return axiosJsonServer
		.get<CartItemType[]>(`/cart/${itemId}`)
		.then((response) => {
			console.log("Already exists");
			return response.data;
		})
		.catch((error) => {
			if (error.response && error.response.status === 404) {
				console.clear();
			}
			console.log("Not exists");
			return null;
		});
};

export type ToggleCartItemCountType = { id: string; count: number };
export const toggleCartItemCount = createAsyncThunk(
	"cart/toggleCartItemCount",
	async (args: ToggleCartItemCountType, store) => {
		const { id, count } = args;
		const cartItem = { id: id, count: count };
		console.log(cartItem);

		return axios
			.put<CartItemType[]>("/api/cartitem", cartItem)
			.then((response) => {
				console.log("Item updated");
				return true;
			})
			.catch((error) => {
				console.log("Can't create cart item", error);
				return false;
			});
	}
);

export const deleteCartItemCount = createAsyncThunk(
	"cart/toggleCartItemCount",
	async (args: ToggleCartItemCountType, store) => {
		const { id, count } = args;
		const cartItem = { id: id, count: count };
		console.log(cartItem);

		return axios
			.put<CartItemType[]>("/api/cartitem", cartItem)
			.then((response) => {
				console.log("Item updated");
				return true;
			})
			.catch((error) => {
				console.log("Can't create cart item", error);
				return false;
			});
	}
);

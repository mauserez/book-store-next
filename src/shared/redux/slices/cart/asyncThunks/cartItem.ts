import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
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
	async (args: ToggleCartItemCountType) => {
		const { id, count } = args;
		const cartItem = { id: id, count: count };
		console.log(cartItem);

		return axios
			.put<CartItemType[]>("/api/cartitem", cartItem)
			.then(() => {
				console.log("Item updated");
				return true;
			})
			.catch((error) => {
				console.log("Can't create cart item", error);
				return false;
			});
	}
);

export const deleteCartItem = createAsyncThunk(
	"cart/deleteCartItem",
	async (id: string) => {
		return await axios.post("/api/cartitem", { id: id });
		/* .then(() => {
				console.log("Item deleted");
				return true;
			})
			.catch((error) => {
				console.log("Can't delete cart item", error);
				return false;
			}); */
	}
);

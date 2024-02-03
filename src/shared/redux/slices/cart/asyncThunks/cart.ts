import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
import { ItemDataType } from "@/src/app/api/catalog/route";
import { isCartItemExist } from "./cartItem";
import { RootState } from "../../../store";

export const getCart = createAsyncThunk("cart/getCart", async () => {
	return axios
		.get<CartItemType[]>("/api/cart")
		.then((response) => {
			return response.data;
		})
		.catch((error) => {
			console.log("Can't get cart", error);
			return [];
		});
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
	return axios
		.delete<CartItemType[]>("/api/cart")
		.then(() => {
			return [];
		})
		.catch((error) => {
			console.log("Can't clear cart", error);
		});
});

export const createCartItem = createAsyncThunk(
	"cart/createCartItem",
	async (item: ItemDataType, store) => {
		const cartItem = { id: item.id, item: item, count: 0 };
		const isExist = await isCartItemExist(item.id);

		if (isExist) {
			return;
		}

		return axios
			.post<CartItemType[]>("/api/cart", cartItem)
			.then((response) => {
				console.log(response);
				return response.data ?? [];
			})
			.catch((error) => {
				console.log("Can't create cart item", error);
			});
	}
);

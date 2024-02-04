import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
import { ItemDataType } from "@/src/app/api/catalog/route";
import { isCartItemExists } from "./cartItem";
import { RootState } from "../../../store";

export const getCart = createAsyncThunk("cart/getCart", async () => {
	return await axios
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
			console.log("Cart cleared");
			return true;
		})
		.catch((error) => {
			console.log("Can't clear cart", error);
		});
});

export const createCartItem = createAsyncThunk(
	"cart/createCartItem",
	async (item: ItemDataType, store) => {
		const cartItem = { id: item.id, item: item, count: 1 };
		const isExists = await isCartItemExists(item.id);

		if (isExists) {
			return false;
		}

		return axios
			.post<CartItemType[]>("/api/cart", cartItem)
			.then((response) => {
				console.log(555);
				return true;
			})
			.catch((error) => {
				console.log("Can't create cart item", error);
				return false;
			});
	}
);

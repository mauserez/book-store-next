import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
import { api } from "@/src/shared/axios";
import { getUserAuth } from "@/src/shared/utils/serverSession";

export const getCart = createAsyncThunk("cart/getCart", async () => {
	const user = await getUserAuth();
	let data: CartItemType[] = [];

	if (user) {
		const response = await api.get<CartItemType[]>(`/cart`);
		data = response.data;
	}

	return data;
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
	return api
		.delete<CartItemType[]>("/cart")
		.then(() => {
			return true;
		})
		.catch((error) => {
			console.log("Can't clear cart", error);
		});
});

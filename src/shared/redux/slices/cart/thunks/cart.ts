import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
import { api } from "@/src/shared/axios";

export const getCart = createAsyncThunk("cart/getCart", async (_, store) => {
	const response = await api.get<CartItemType[]>(`/cart`);
	return response.data ?? [];
});

export const clearCart = createAsyncThunk("cart/clearCart", async () => {
	return api
		.delete<CartItemType[]>("/cart")
		.then(() => {
			console.log("Cart cleared");
			return true;
		})
		.catch((error) => {
			console.log("Can't clear cart", error);
		});
});

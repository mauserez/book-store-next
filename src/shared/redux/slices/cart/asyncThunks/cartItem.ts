import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";

export type ToggleCartItemCountType = { id: string; count: number };
export const toggleCartItemCount = createAsyncThunk(
	"cart/toggleCartItemCount",
	async (args: ToggleCartItemCountType) => {
		const { id, count } = args;
		const cartItem = { id: id, count: count };
		const { data } = await axios.put<CartItemType[]>("/api/cartitem", cartItem);
		return data;
	}
);

export const deleteCartItem = createAsyncThunk(
	"cart/deleteCartItem",
	async (id: string) => {
		return await axios.delete("/api/cartitem", { data: { id: id } });
	}
);

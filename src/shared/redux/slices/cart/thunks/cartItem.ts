import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
import { CatalogItemType } from "@/src/app/api/catalog/route";
import { showError } from "@/src/shared/utils/axios";
import { getStoreUsers } from "../../auth/utils";
import { api } from "@/src/shared/axios";

export type ToggleCartItemCountType = { id: number; count: number };

export type CartItemCountUpdateType = {
	id: number;
	count: number;
};

export const toggleCartItemCount = createAsyncThunk(
	"cart/toggleCartItemCount",
	async (args: ToggleCartItemCountType) => {
		const { id, count } = args;

		const cartItem: CartItemCountUpdateType = {
			id: id,
			count: count,
		};

		const { data } = await api.put("/cart-item", cartItem);

		return data;
	}
);

export const deleteCartItem = createAsyncThunk(
	"cart/deleteCartItem",
	async (id: number, store) => {
		const users = getStoreUsers(store);
		return await api.delete("/cart-item", {
			data: { id: id, temp_user_id: users.tempUserId },
		});
	}
);

export type NewCartItemType = Omit<CartItemType, "id">;

export const createCartItem = createAsyncThunk(
	"cart/createCartItem",
	async (item: CatalogItemType, store) => {
		const cartItem = {
			item_id: item.id,
			price: item.saleInfo?.retailPrice?.amount ?? 0,
			currency: item.saleInfo?.retailPrice?.currencyCode ?? "RUB",
			img_url: item.volumeInfo?.imageLinks?.thumbnail ?? "",
			title: item.volumeInfo?.title ?? "",
			description: item.volumeInfo?.description,
			rating: item.volumeInfo?.averageRating ?? null,
			reviews: item.volumeInfo?.ratingsCount ?? null,
			author: item.volumeInfo?.authors?.join(",") ?? "",
			delivery: "Delivery:shipping",
			count: 1,
		} as NewCartItemType;

		try {
			return (await api.post("/cart-item", cartItem)).data;
		} catch (error) {
			showError(error);
		}
	}
);

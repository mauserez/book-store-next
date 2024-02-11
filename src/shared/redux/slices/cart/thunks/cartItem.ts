import { createAsyncThunk } from "@reduxjs/toolkit";
import { type CartItemType } from "../cartSlice";
import { CatalogItemType } from "@/src/app/api/catalog/route";
import { api } from "@/src/shared/axios";
import { errorText } from "@/src/shared/utils/axios";

export type CartItemCountType = { itemId: string; count: number };

export const toggleCartItemCount = createAsyncThunk(
	"cart/toggleCartItemCount",
	async (item: CartItemCountType) => {
		const { data } = await api.put("/cart-item", item);
		return data;
	}
);

export const deleteCartItem = createAsyncThunk(
	"cart/deleteCartItem",
	async (itemId: string) => {
		const response = await api.delete("/cart-item", {
			data: { itemId: itemId },
		});

		return response.data;
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
			console.log(errorText(error));
		}
	}
);

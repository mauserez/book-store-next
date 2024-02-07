import { NextRequest, NextResponse } from "next/server";
import jsonServer from "@/src/shared/axios";
import { CartItemType } from "@/src/shared/redux/slices/cart/cartSlice";

export async function GET() {
	const cart = await jsonServer
		.get<CartItemType[]>("/cart")
		.then((response) => {
			const res = response.data;
			return res;
		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			}
			return [];
		});

	return NextResponse.json(cart);
}

export async function DELETE() {
	const cart = await jsonServer
		.delete<CartItemType[]>("/cart")
		.then(() => {
			return true;
		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			}
			return false;
		});

	return NextResponse.json(cart);
}


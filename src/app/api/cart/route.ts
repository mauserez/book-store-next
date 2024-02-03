import { NextRequest, NextResponse } from "next/server";
import axiosJsonServer from "@/src/shared/axios";
import { CartItemType } from "@/src/shared/redux/slices/cart/cartSlice";

export const cartApi = process.env.NEXT_PUBLIC_CART_API;

export async function GET() {
	const cart = await axiosJsonServer
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
	const cart = await axiosJsonServer
		.delete<CartItemType[]>("/cart")
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

export async function POST(req: NextRequest) {
	const item = (await req.json()) as CartItemType;

	const cart = await axiosJsonServer
		.post<CartItemType[]>("/cart", item)
		.then((response) => {
			const res = response.data;
			return res;
		})
		.catch((error) => {
			console.log(error);
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			}
			return [];
		});

	return NextResponse.json(cart);
}

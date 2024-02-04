import { NextRequest, NextResponse } from "next/server";
import jsonServer from "@/src/shared/axios";
import { CartItemType } from "@/src/shared/redux/slices/cart/cartSlice";

export async function GET(req: NextRequest, context: any) {
	console.log(context);
	/* const cart = await axiosJsonServer
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
		}); */

	return NextResponse.json({});
}

export async function PUT(req: NextRequest) {
	const request = await req.json();

	const result = await jsonServer
		.put<boolean>(`/cart/${request.id}`, { count: request.count })
		.then((response) => {
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

	return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
	const request = await req.json();

	const result = await jsonServer
		.put<boolean>(`/cart/${request.id}`)
		.then((response) => {
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

	return NextResponse.json(result);
}

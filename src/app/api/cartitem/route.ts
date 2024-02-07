import { NextRequest, NextResponse } from "next/server";
import jsonServer from "@/src/shared/axios";
import { CatalogItemType } from "@/src/shared/redux/slices/cart/cartSlice";

export async function DELETE(req: NextRequest) {
	const request = await req.json();

	const result = await jsonServer
		.delete(`/cart/${request.id}`)
		.then(() => {
			return true;
		})
		.catch((error) => {
			if (error.response) {
				console.log(error.response.data);
				console.log(error.response.status);
				console.log(error.response.headers);
			}
			throw Error("Can't delete item");
		});

	return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
	const item = (await req.json()) as CatalogItemType;

	const cart = await jsonServer
		.post("/cart", item)
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

export async function PUT(req: NextRequest) {
	const item = (await req.json()) as CatalogItemType;

	const cart = await jsonServer
		.post("/cart", item)
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

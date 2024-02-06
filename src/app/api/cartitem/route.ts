import { NextRequest, NextResponse } from "next/server";
import jsonServer from "@/src/shared/axios";

export async function PUT(req: NextRequest) {
	const request = await req.json();

	const result = await jsonServer
		.patch<boolean>(`/cart/${request.id}`, { count: request.count })
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

	return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
	const request = await req.json();

	const result = await jsonServer
		.delete<boolean>(`/cart/${request.id}`)
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

	return NextResponse.json(result);
}

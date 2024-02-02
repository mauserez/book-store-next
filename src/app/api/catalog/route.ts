import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import QueryString from "qs";

export type CatalogApiProps = {
	q?: string;
	printType?: string;
	startIndex?: number;
	maxResults?: number;
	langRestrict?: string;
};

export type ItemDataInfoType = {
	authors: string[];
	averageRating?: number;
	description: string;
	imageLinks: {
		thumbnail?: string;
	};
	language: string;
	ratingsCount?: number;
	title: string;
};

export type ItemDataSaleInfoType = {
	retailPrice?: {
		amount: number;
		currencyCode: string;
	};
};

export type ItemDataType = {
	id: string;
	volumeInfo: ItemDataInfoType;
	saleInfo: ItemDataSaleInfoType;
};

export type CatalogApiResponseType = ItemDataType[];

export async function POST(req: NextRequest) {
	const params = await req.json();

	params.q = params.q ? params.q : "subject:Architecture";
	params.printType = params.printType ? params.printType : "books";
	params.startIndex = params.startIndex ? params.startIndex : 0;
	params.maxResults = 6;
	params.langRestrict = params.langRestrict ? params.langRestrict : "en";
	const key = process.env.NEXT_PUBLIC_GBOOKS_KEY2;

	const paramsUrl = QueryString.stringify(params as Record<string, string>);

	const url = `https://www.googleapis.com/books/v1/volumes?key=${key}&${paramsUrl}`;

	const books = await axios
		.get<CatalogApiResponseType>(url)
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

	return NextResponse.json(books);
}

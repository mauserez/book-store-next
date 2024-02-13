import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import QueryString from "qs";
import { errorText } from "@/src/shared/utils/axios";

export type CatalogApiProps = {
	q?: string;
	printType?: string;
	startIndex?: number;
	maxResults?: number;
	langRestrict?: string;
};

export type ItemDataInfoType = {
	authors?: string[];
	averageRating?: number;
	description?: string;
	imageLinks?: {
		thumbnail?: string;
	};
	language: string;
	ratingsCount?: number;
	title: string;
};

export type CatalogItemSaleInfoType = {
	retailPrice?: {
		amount: number;
		currencyCode: string;
	};
};

export type CatalogItemType = {
	id: string;
	volumeInfo?: ItemDataInfoType;
	saleInfo: CatalogItemSaleInfoType;
};

export type CatalogApiResponseType = { items: CatalogItemType[] };

export async function POST(req: NextRequest) {
	const params = await req.json();

	params.q = params.q ? params.q : "subject:Architecture";
	params.printType = params.printType ? params.printType : "books";
	params.startIndex = params.startIndex ? params.startIndex : 0;
	params.filter = "paid-ebooks";
	params.maxResults = 6;
	params.langRestrict = params.langRestrict ? params.langRestrict : "en";
	const key = process.env.GBOOKS_KEY2;

	const paramsUrl = QueryString.stringify(params as Record<string, string>);

	const url = `https://www.googleapis.com/books/v1/volumes?key=${key}&${paramsUrl}`;

	const books = await axios
		.get<CatalogApiResponseType>(url)
		.then((response) => {
			const res = response.data.items;
			return res ?? [];
		})
		.catch((error) => {
			console.log(errorText(error));
			return [];
		});

	return NextResponse.json(books);
}

import { NextRequest, NextResponse } from "next/server";
import { NextSplitSearchUrl } from "@/src/shared/utils/url";
import axios from "axios";

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

export type CatalogApiResponseType = {
	items: ItemDataType[] | [];
};

export async function POST(req: NextRequest) {
	const params = req.json() as CatalogApiProps;

	params.q = params.q ? params.q : "subject:Architecture";
	params.printType = params.printType ? params.printType : "books";
	params.startIndex = params.startIndex ? params.startIndex : 0;
	params.maxResults = 6;
	params.langRestrict = params.langRestrict ? params.langRestrict : "en";
	const key = process.env.NEXT_PUBLIC_GBOOKS_KEY;

	const paramsUrl = new URLSearchParams(<URLSearchParams>params);
	const url = `https://www.googleapis.com/books/v1/volumes?key=${key}&${paramsUrl}`;

	const books = await axios
		.get<CatalogApiResponseType>(url)
		.then((response) => {
			const res = response.data.items;
			return res;
		})
		.catch((error) => {
			return [];
		});

	return NextResponse.json({
		books: books,
		result: 123,
	});
}

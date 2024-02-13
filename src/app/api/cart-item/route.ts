import { supabase } from "@/supabase";
import { NextRequest, NextResponse } from "next/server";
import {
	NewCartItemType,
	CartItemCountType,
} from "@/src/shared/redux/slices/cart/thunks/cartItem";

import { nextResponseUserError } from "@/src/shared/utils/error";
import { getUserAuth } from "@/src/shared/utils/serverSession";

export async function POST(req: NextRequest) {
	const item = (await req.json()) as NewCartItemType;
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError();
	}

	item.user_id = user.id;

	const result = await supabase
		.from("cart")
		.select()
		.eq("user_id", user.id)
		.eq("item_id", item.item_id);

	if (result.data?.length) {
		return NextResponse.json(
			{ message: "Item already exists" },
			{ status: 400 }
		);
	}

	await supabase.from("cart").insert(item);

	return NextResponse.json({ message: "Item added" }, { status: 200 });
}

export async function PUT(req: NextRequest) {
	const item = (await req.json()) as CartItemCountType;
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError();
	}

	if (item.count < 0) {
		return NextResponse.json(
			{ message: "Don't pass negative values" },
			{ status: 500 }
		);
	}

	await supabase
		.from("cart")
		.update({ count: item.count })
		.eq("user_id", user.id)
		.eq("item_id", item.itemId);

	return NextResponse.json({ message: "Item updated" }, { status: 200 });
}

import { CartItemDeletedType } from "@/src/shared/redux/slices/cart/thunks/cartItem";

export async function DELETE(req: NextRequest) {
	const item = (await req.json()) as CartItemDeletedType;
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError();
	}

	if (!item.itemId) {
		return NextResponse.json({ message: "No item to delete" }, { status: 500 });
	}

	await supabase
		.from("cart")
		.delete()
		.eq("user_id", user.id)
		.eq("item_id", item.itemId);

	return NextResponse.json(true);
}

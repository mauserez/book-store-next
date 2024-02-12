import { NextRequest, NextResponse } from "next/server";
import {
	NewCartItemType,
	CartItemCountType,
} from "@/src/shared/redux/slices/cart/thunks/cartItem";

import prisma from "@/prisma";
import { nextResponseUserError } from "@/src/shared/utils/error";
import { getUserAuth } from "@/src/shared/utils/serverSession";

export async function POST(req: NextRequest) {
	const item = (await req.json()) as NewCartItemType;
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError;
	}

	const exists = await prisma.cart.findFirst({
		where: {
			AND: [{ user_id: user.id }, { item_id: item.item_id }],
		},
	});

	if (!exists) {
		item.user_id = user.id;
		await prisma.cart.create({ data: item });
		return NextResponse.json(true);
	}

	return NextResponse.json(false);
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

	const result = await prisma.cart.updateMany({
		where: {
			AND: [{ item_id: item.itemId }, { user_id: user.id }],
		},
		data: {
			count: item.count,
		},
	});

	return NextResponse.json(result);
}

import { CartItemDeletedType } from "@/src/shared/redux/slices/cart/thunks/cartItem";

export async function DELETE(req: NextRequest) {
	const item = (await req.json()) as CartItemDeletedType;
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError;
	}

	if (!item.itemId) {
		return NextResponse.json({ message: "No item to delete" }, { status: 500 });
	}

	await prisma.cart.deleteMany({
		where: {
			AND: [{ user_id: user.id }, { item_id: item.itemId }],
		},
	});

	return NextResponse.json(true);
}

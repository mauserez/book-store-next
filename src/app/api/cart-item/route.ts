import { NextRequest, NextResponse } from "next/server";
import {
	NewCartItemType,
	CartItemCountUpdateType,
} from "@/src/shared/redux/slices/cart/thunks/cartItem";

import prisma, {
	getCurrentUser,
	nextResponseUserError,
} from "@/src/shared/utils/prisma";

export async function PUT(req: NextRequest) {
	const item = (await req.json()) as CartItemCountUpdateType;
	const currentUser = getCurrentUser();

	if (!currentUser.userExists) {
		return nextResponseUserError;
	}

	if (item.count < 0) {
		return NextResponse.json(
			{ message: "Don't pass negative values" },
			{ status: 500 }
		);
	}

	const cond = currentUser.userRawCond;

	const result = await prisma.$queryRawUnsafe(`
		UPDATE CART
		SET COUNT = ${item.count}
		WHERE id = ${item.id}
		${cond}
	`);

	return NextResponse.json(result);
}

export async function POST(req: NextRequest) {
	const item = (await req.json()) as NewCartItemType;
	const currentUser = getCurrentUser();

	if (!currentUser.userExists) {
		return nextResponseUserError;
	}

	const notExists = await cartItemNotExists(item, currentUser.userRawCond);

	if (notExists) {
		item.temp_user_id = currentUser.tempUserId;
		item.user_id = currentUser.userId;

		await prisma.cart.create({ data: item });
		return NextResponse.json(true);
	}

	return NextResponse.json(false);
}

async function cartItemNotExists(item: NewCartItemType, userCond: string) {
	let notExists = true;

	let rawSql = `
		SELECT 1
		FROM cart
		WHERE 1 = 1
		AND item_id = '${item.item_id}'
		${userCond}
	`;

	notExists = !!(await prisma.$queryRawUnsafe(rawSql));

	return notExists;
}

export async function DELETE(req: NextRequest) {
	const id = await req.json();
	const currentUser = getCurrentUser();

	if (!currentUser.userExists) {
		return nextResponseUserError;
	}

	const result = prisma.$queryRawUnsafe(`
		DELETE
		FROM CART
		WHERE id = ${id}
		${currentUser.userRawCond}
	`);

	return NextResponse.json(result);
}

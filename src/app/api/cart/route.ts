import { CartItemType } from "@/src/shared/redux/slices/cart/cartSlice";

import prisma, {
	getCurrentUser,
	nextResponseUserError,
} from "@/src/shared/utils/prisma";

import { NextResponse, NextRequest } from "next/server";

export async function GET() {
	const currentUser = getCurrentUser();

	if (!currentUser.userExists) {
		return nextResponseUserError();
	}

	let rawSql = `
		SELECT *
		FROM cart
		WHERE 1 = 1
		${currentUser.userRawCond}
	`;

	const result = await prisma.$queryRawUnsafe<CartItemType[]>(rawSql);

	return NextResponse.json(result);
}

export async function DELETE(req: NextRequest) {
	const currentUser = getCurrentUser();

	if (currentUser.userExists) {
		return nextResponseUserError;
	}

	const cart = await prisma.$queryRawUnsafe(`
		DELETE FROM cart
		WHERE 1=1
		${currentUser.userRawCond}
	`);

	return NextResponse.json(cart);
}

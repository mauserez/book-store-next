import prisma from "@/prisma";
import { nextResponseUserError } from "@/src/shared/utils/error";
import { NextResponse } from "next/server";
import { getUserAuth } from "@/src/shared/utils/serverSession";

export async function GET() {
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError();
	}

	const result = await prisma.cart.findMany({
		where: {
			user_id: user.id,
		},
	});

	return NextResponse.json(result);
}

export async function DELETE() {
	const user = await getUserAuth();

	if (!user) {
		return nextResponseUserError();
	}

	const cart = await prisma.cart.deleteMany({
		where: {
			id: user.id,
		},
	});

	return NextResponse.json(cart);
}

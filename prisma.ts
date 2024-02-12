import { PrismaClient } from "@prisma/client";
/*
declare global {
	var prisma: PrismaClient | undefined;
}

export const prisma =
	globalThis.prisma ||
	new PrismaClient({
		log: ["query", "info", "warn", "error"],
	}); */

const prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

//if (process.env.NODE_ENV !== "production") globalThis.prisma = prisma;

export default prisma;

import { cookies } from "next/headers";

export const getCurrentUser = () => {
	const tempUserId = cookies().get("tempUserId")?.value ?? null;
	const userId = null;
	const userExists = !!tempUserId || !!userId;

	let userRawCond = "";
	if (userExists) {
		userRawCond += `AND (1 = 0 `;

		if (tempUserId) {
			userRawCond += ` OR temp_user_id = '${tempUserId}' `;
		}

		if (userId) {
			userRawCond += ` OR user_id = ${userId} `;
		}

		userRawCond += `)`;
	}

	return {
		tempUserId: tempUserId,
		userId: userId,
		userExists: userExists,
		userRawCond: userRawCond,
	};
};

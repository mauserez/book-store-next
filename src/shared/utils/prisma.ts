import { PrismaClient } from "@prisma/client";
import { cookies } from "next/headers";

let prisma: PrismaClient;

prisma = new PrismaClient({
	log: ["query", "info", "warn", "error"],
});

export default prisma;

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

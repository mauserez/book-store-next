import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { LoginFormFieldsType } from "@/src/features/auth/login/ui";
import prisma from "@/src/shared/utils/prisma";
import { somethingGoesWrong } from "@/src/shared/utils/error";

export async function POST(req: NextRequest) {
	const { email, password }: LoginFormFieldsType = await req.json();
	const hashedPassword = await bcrypt.hash(password, 10);

	const searchUser = await prisma.user.findFirst({
		where: { AND: { email: email } },
	});

	if (!searchUser) {
		try {
			await prisma.user.create({
				data: {
					email: email,
					password: hashedPassword,
				},
			});

			return NextResponse.json(
				{ message: "User successfully created" },
				{ status: 200 }
			);
		} catch (error) {
			return somethingGoesWrong();
		}
	} else {
		return NextResponse.json(
			{ message: "User already exists" },
			{ status: 409 }
		);
	}
}

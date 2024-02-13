import bcrypt from "bcrypt";
import { NextRequest, NextResponse } from "next/server";

import { LoginFormFieldsType } from "@/src/features/auth/login/ui";
import { supabase } from "@/supabase";
import { somethingGoesWrong } from "@/src/shared/utils/error";

export async function POST(req: NextRequest) {
	const { email, password }: LoginFormFieldsType = await req.json();
	const hashedPassword = await bcrypt.hash(password, 10);

	const searchUser = await supabase.from("user").select().eq("email", email);

	if (searchUser.data && searchUser.data.length === 0) {
		try {
			await supabase
				.from("user")
				.insert({ email: email, password: hashedPassword });

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

import { NextResponse } from "next/server";

export const nextResponseUserError = () => {
	return NextResponse.json({ message: "No session user" }, { status: 401 });
};

export const somethingGoesWrong = () => {
	return NextResponse.json(
		{ message: "Something goes wrong" },
		{ status: 500 }
	);
};

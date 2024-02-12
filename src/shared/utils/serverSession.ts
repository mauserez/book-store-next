"use server";
import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export const getUserAuth = async () => {
	const res = await getServerSession(authOptions);
	return res?.user;
};

export const getAuth = async () => {
	const res = await getServerSession(authOptions);
	return res;
};

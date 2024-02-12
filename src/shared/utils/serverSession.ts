"use server";
import { authOptions } from "@/auth.config";
import { getServerSession } from "next-auth";

export const getUserAuth = async () => {
	const res = await getServerSession(authOptions);
	return res?.user;
};

export const getAuth = async () => {
	const res = await getServerSession(authOptions);
	return res;
};

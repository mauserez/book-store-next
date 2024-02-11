import { authOptions } from "@/src/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";

export const useSessionUser = () => {
	const session = useSession();
	return session.data?.user ?? null;
};

export const getSessionUser = async () => {
	const session = await getServerSession(authOptions);
	return session;
};

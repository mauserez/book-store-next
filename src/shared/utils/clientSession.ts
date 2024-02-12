import { useSession } from "next-auth/react";

export const useUserAuth = () => {
	const session = useSession();
	return session.data?.user ?? null;
};

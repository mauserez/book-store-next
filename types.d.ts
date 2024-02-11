import { user } from "@prisma/client";

declare module "next-auth" {
	interface Session {
		user: user;
	}
}

declare module "next-auth/jwt" {
	interface JWT {
		user: user;
	}
}

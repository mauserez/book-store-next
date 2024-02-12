import prisma from "@/prisma";
import bcrypt from "bcrypt";

import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
	secret: process.env.NEXTAUTH_SECRET,
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "email", type: "email", placeholder: "input email" },
				password: {
					label: "password",
					type: "password",
					placeholder: "input password",
				},
			},
			async authorize(credentials) {
				if (!credentials?.password || !credentials.email) {
					throw new Error("Please provide all credentials");
				}

				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				if (!user) {
					throw new Error("User credentials is not correct");
				}

				const isPasswordCorrect = await bcrypt.compare(
					credentials.password,
					user.password
				);

				if (!isPasswordCorrect) {
					throw new Error("User credentials is not correct");
				}

				const { password, ...userWithoutPassword } = user;

				return userWithoutPassword as any;
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.user = user as any;
			}
			return token;
		},
		async session({ token, session }) {
			session.user = token.user;
			return session;
		},
	},
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

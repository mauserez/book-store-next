import { supabase } from "./supabase";
import bcrypt from "bcrypt";

import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
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

				const user = await supabase
					.from("user")
					.select()
					.eq("email", credentials.email)
					.limit(1)
					.single();

				if (!user.data) {
					throw new Error("User credentials is not correct");
				}

				const isPasswordCorrect = await bcrypt.compare(
					credentials.password,
					user.data.password
				);

				if (!isPasswordCorrect) {
					throw new Error("User credentials is not correct");
				}

				const { password, ...userWithoutPassword } = user.data;

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

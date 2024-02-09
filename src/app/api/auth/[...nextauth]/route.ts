import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers/credentials";
import { bcrypt } from "bcrypt";
import { sql } from "@vercel/postgres";

export const authOptions = {
	providers: [],
};

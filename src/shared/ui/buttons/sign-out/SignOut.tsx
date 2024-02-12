"use client";

import Button from "../button/Button";
import { signOut } from "next-auth/react";

import s from "./SignOut.module.css";
export const SignOut = () => {
	return (
		<Button
			onClick={() => {
				signOut();
			}}
			className={s.logOut}
		>
			Log out
		</Button>
	);
};

"use client";
import { ButtonIcon } from "..";
import { LoginForm } from "@/src/features/auth/login/ui/LoginForm";
import s from "./ProfileIcon.module.css";
import { useState } from "react";
import { useSessionUser } from "@/src/shared/utils/session";

export const ProfileIcon = () => {
	const session = useSessionUser();

	const auth = !!session;
	const link = auth ? "/profile" : false;
	const [formHidden, setFormHidden] = useState(true);

	return (
		<div className={s.iconWrap}>
			<ButtonIcon
				onClick={() => {
					if (!auth) {
						setFormHidden(!formHidden);
					}
				}}
				link={link}
				src="icons/profile.svg"
			/>
			{!auth && !formHidden ? (
				<LoginForm
					hideForm={() => {
						setFormHidden(true);
					}}
				/>
			) : null}
		</div>
	);
};

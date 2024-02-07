"use client";
import { ButtonIcon } from "..";
import { LoginForm } from "@/src/entities/login/ui/LoginForm";
import s from "./ProfileIcon.module.css";
import { useState } from "react";

export const ProfileIcon = () => {
	const auth = true;
	const link = !auth ? false : "/profile";
	const [formHidden, setFormHidden] = useState(true);

	return (
		<div className={s.iconWrap}>
			{/* /profile */}
			<ButtonIcon
				onClick={() => {
					if (!auth) {
						setFormHidden(!formHidden);
					}
				}}
				link={link}
				src="icons/profile.svg"
			/>
			{!auth && !formHidden ? <LoginForm /> : null}
		</div>
	);
};

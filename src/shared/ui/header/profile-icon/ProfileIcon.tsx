"use client";

import { ChangeEvent, useState } from "react";
import { ButtonIcon } from "..";
import { LoginForm } from "@/src/entities/login/ui/LoginForm";
import s from "./ProfileIcon.module.css";

export const ProfileIcon = () => {
	return (
		<div className={s.iconWrap}>
			<ButtonIcon link="/profile" src="icons/profile.svg" />
			<LoginForm />
		</div>
	);
};

import React from "react";
import { Nav, Logo } from "@/src/shared/ui/header";
import { HeaderButtons } from "..";

import s from "./Header.module.css";

export const Header = () => {
	return (
		<header className={`${s.headerWrap} app-header`}>
			<div className={`${s.header} inner-container`}>
				<Logo />
				<Nav />
				<HeaderButtons />
			</div>
		</header>
	);
};

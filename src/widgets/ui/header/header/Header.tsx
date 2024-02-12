import { Nav, Logo } from "@/src/shared/ui/header";
import { HeaderButtons } from "..";

import { getUserAuth } from "@/src/shared/utils/serverSession";
import { SignOut } from "@/src/shared/ui/buttons";

import s from "./Header.module.css";

export const Header = async () => {
	const user = await getUserAuth();

	return (
		<header className={`${s.headerWrap} app-header`}>
			<div className={`${s.header} inner-container`}>
				<Logo />
				<Nav />
				{user?.email ? <SignOut /> : null}
				<HeaderButtons />
			</div>
		</header>
	);
};

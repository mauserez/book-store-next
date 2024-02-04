import { CartIcon, ProfileIcon } from "@/src/shared/ui/header";
import s from "./HeaderIcons.module.css";
//import { SearchButton } from "@/features/ui/header/search-button";

export const HeaderButtons = () => {
	return (
		<div className={s.headerButtons}>
			<ProfileIcon />
			{/* <SearchButton /> */}
			<CartIcon />
		</div>
	);
};

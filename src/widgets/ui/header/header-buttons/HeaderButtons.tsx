import { CartButton, ProfileButton } from "@/src/shared/ui/header";
import s from "./HeaderButtons.module.css";
//import { SearchButton } from "@/features/ui/header/search-button";

export const HeaderButtons = () => {
	return (
		<div className={s.headerButtons}>
			<ProfileButton />
			{/* <SearchButton /> */}
			<CartButton />
		</div>
	);
};

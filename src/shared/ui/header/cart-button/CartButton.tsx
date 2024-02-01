import { ButtonIcon } from "..";

export const CartButton = () => {
	//cartItemCounter()
	const counter = 0;
	return (
		<ButtonIcon
			link="/cart"
			counter={0}
			className="header__cart-btn"
			src="icons/cart.svg"
		/>
	);
};

import { Item, BookPrice } from "@/src/entities/catalog";
import { CartItemType } from "@/src/shared/redux/slices/cart/cartSlice";
import CartItemActionButton from "../cart-item-action-button/CartItemActionButton";
import s from "./CartRow.module.css";
import { RemoveFromCart } from "@/src/features/cart/ui";

type CartRowProps = { cartItem: CartItemType };
export const CartRow = (props: CartRowProps) => {
	const { cartItem } = props;
	const item = cartItem.item;

	return (
		<div className={s.cartRow}>
			<Item behavior="cart" item={item} />
			<CartItemActionButton item={item} />
			<BookPrice {...item.saleInfo} />
			<div className={s.delivery}>Shipping:delivery</div>
			<RemoveFromCart cartItemId={cartItem.id} />
		</div>
	);
};

import { numberWithSpaces } from "@/src/shared/utils/number";

import { CartItemType } from "@/src/shared/redux/slices/cart/cartSlice";
import { CartItem, CartItemActionButton } from "@/src/entities/cart/ui";
import { DeleteCartItem } from "@/src/features/cart/ui";

import s from "./CartRow.module.css";

type CartRowProps = { item: CartItemType };
export const CartRow = (props: CartRowProps) => {
	const { item } = props;

	return (
		<div className={s.cartRow}>
			<CartItem item={item} />
			<CartItemActionButton itemId={item.item_id} />
			{
				<div className={s.price}>
					<span>{item.currency}</span>
					<span>{numberWithSpaces(item.price)}</span>
				</div>
			}
			<div className={s.delivery}>Shipping:delivery</div>
			<DeleteCartItem itemId={item.item_id} />
		</div>
	);
};

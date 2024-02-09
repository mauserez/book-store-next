"use client";
import { useAppSelector } from "@/src/shared/redux/hooks";
import s from "./CartTable.module.css";
import { selectCart } from "@/src/shared/redux/slices/cart/cartSlice";
import { CartRow } from "@/src/entities/cart/ui/cart-row/CartRow";

export const CartTable = () => {
	const cart = useAppSelector(selectCart);
	return (
		<section className={s.cartTable}>
			{cart.length > 0
				? cart.map((cartItem) => {
						return <CartRow key={cartItem.id} item={cartItem} />;
				  })
				: null}
		</section>
	);
};

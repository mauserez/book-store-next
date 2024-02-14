"use client";
import { useAppSelector } from "@/src/shared/redux/hooks";
import s from "./CartTable.module.css";
import {
	selectCart,
	selectCartCurrency,
	selectCartPrice,
} from "@/src/shared/redux/slices/cart/cartSlice";
import { CartRow } from "@/src/entities/cart/ui";
import { Button } from "@/src/shared/ui/buttons";
import { useUserAuth } from "@/src/shared/utils/clientSession";

export const CartTable = () => {
	const cart = useAppSelector(selectCart);
	const cartPrice = useAppSelector(selectCartPrice);
	const cartCurrency = useAppSelector(selectCartCurrency);
	const user = useUserAuth();

	return user && cart.length > 0 ? (
		<>
			<section className={s.cartTable}>
				{cart.map((cartItem) => {
					return <CartRow key={cartItem.id} item={cartItem} />;
				})}
			</section>
			<div className={s.total}>
				<div className={s.totalTitle}>
					TOTAL PRICE: {cartCurrency} {cartPrice}
				</div>
				<Button text="CHECKOUT" />
			</div>
		</>
	) : null;
};

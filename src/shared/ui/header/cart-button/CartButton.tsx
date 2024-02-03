"use client";

import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { ButtonIcon } from "..";
import { useCallback, useEffect, useState } from "react";
import { getCart } from "@/src/shared/redux/slices/cart/asyncThunks/cart";
import { selectCart } from "@/src/shared/redux/slices/cart/cartSlice";

export const CartButton = () => {
	const dispatch = useAppDispatch();
	const cart = useAppSelector(selectCart);
	const [mounted, setMounted] = useState(false);
	const counter = cart.length;

	const handleCartCounter = useCallback(async () => {
		await dispatch(getCart());
		setMounted(true);
	}, [dispatch]);

	useEffect(() => {
		handleCartCounter();
	}, [handleCartCounter]);

	return (
		<ButtonIcon
			link="/cart"
			counter={mounted ? counter : null}
			className="header__cart-btn"
			src="icons/cart.svg"
		/>
	);
};

"use client";

import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { ButtonIcon } from "..";
import { useCallback, useLayoutEffect, useState } from "react";
import { getCart } from "@/src/shared/redux/slices/cart/asyncThunks/cart";
import {
	selectCartLen,
	selectStatus,
} from "@/src/shared/redux/slices/cart/cartSlice";

export const CartIcon = () => {
	const dispatch = useAppDispatch();
	const status = useAppSelector(selectStatus);
	const counter = useAppSelector(selectCartLen);
	const [mounted, setMounted] = useState(false);

	const handleCartCounter = useCallback(async () => {
		await dispatch(getCart());
		setMounted(true);
	}, [dispatch]);

	useLayoutEffect(() => {
		handleCartCounter();
	}, [handleCartCounter, status]);

	return (
		<ButtonIcon
			link="/cart"
			counter={mounted ? counter : null}
			src="icons/cart.svg"
		/>
	);
};

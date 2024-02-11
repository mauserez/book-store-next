"use client";

import { ComponentProps } from "react";
import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { Button } from "@/src/shared/ui/buttons";

import { selectCart } from "@/src/shared/redux/slices/cart/cartSlice";
import { toggleCartItemCount } from "@/src/shared/redux/slices/cart/thunks/cartItem";

import clsx from "clsx";
import s from "./ToggleCartItemCount.module.css";

type ToggleCartItemCountProps = { itemId: string };
export const ToggleCartItem = (props: ToggleCartItemCountProps) => {
	const { itemId } = props;
	const dispatch = useAppDispatch();
	const cart = useAppSelector(selectCart);
	const item = cart.find((i) => {
		return itemId === i.item_id;
	});

	if (!item) {
		return null;
	}

	const count = item.count;

	const handleMinus = () => {
		if (item.count >= 1) {
			dispatch(toggleCartItemCount({ itemId: itemId, count: count - 1 }));
		}
	};

	const handlePlus = () => {
		dispatch(toggleCartItemCount({ itemId: itemId, count: count + 1 }));
	};

	return (
		<Button className={s.plusMinus}>
			<Btn disabled={!count} onClick={handleMinus} src="/svg/cart/minus.svg" />
			<Counter value={count} />
			<Btn onClick={handlePlus} src="/svg/cart/plus.svg" />
		</Button>
	);
};

type BtnProps = ComponentProps<"div"> & { src: string; disabled?: boolean };
const Btn = (props: BtnProps) => {
	const { src, disabled = "", ...divProps } = props;
	const disabledClass = disabled ? s.btnDisabled : "";

	return (
		<div className={clsx(s.btn, disabledClass)} {...divProps}>
			<img src={src} alt="Кнопка корзины" />
		</div>
	);
};

type CounterProps = { value: number };
const Counter = (props: CounterProps) => {
	const { value } = props;
	return <div className={s.counter}>{value}</div>;
};

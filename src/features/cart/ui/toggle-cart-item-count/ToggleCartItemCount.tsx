"use client";
import React, { useState } from "react";

import { ComponentProps } from "react";
import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import Image from "next/image";

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
		<div className={s.plusMinus}>
			<Btn
				disabled={!count}
				handleClick={handleMinus}
				src="/svg/cart/minus.svg"
			/>
			<Counter value={count} />
			<Btn handleClick={handlePlus} src="/svg/cart/plus.svg" />
		</div>
	);
};

type BtnProps = ComponentProps<"div"> & {
	src: string;
	disabled?: boolean;
	handleClick?: () => void;
};
const Btn = React.memo(function Btn(props: BtnProps) {
	const [clicked, setClicked] = useState(false);
	const { src, disabled = "", handleClick, ...divProps } = props;
	const disabledClass = disabled ? s.btnDisabled : "";
	const clickedClass = clicked ? s.btnClicked : "";

	return (
		<div
			onClick={() => {
				setClicked(true);

				if (handleClick) {
					handleClick();
				}
			}}
			onAnimationEnd={() => {
				setClicked(false);
			}}
			className={clsx(s.btn, disabledClass, clickedClass)}
			{...divProps}
		>
			<Image width={22} height={25} src={src} alt="Кнопка корзины" />
		</div>
	);
});

type CounterProps = { value: number };
const Counter = (props: CounterProps) => {
	const { value } = props;
	return <div className={s.counter}>{value}</div>;
};

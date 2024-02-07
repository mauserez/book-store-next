"use client";
import { Button } from "@/src/shared/ui/buttons";
import s from "./PlusMinus.module.css";
import { ComponentProps } from "react";
import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { selectCart } from "@/src/shared/redux/slices/cart/cartSlice";
import { CatalogItemType } from "@/src/app/api/catalog/route";
import { toggleCartItemCount } from "@/src/shared/redux/slices/cart/asyncThunks/cartItem";
import clsx from "clsx";

type PlusMinusProps = { item: CatalogItemType };
export const PlusMinus = (props: PlusMinusProps) => {
	const { item } = props;
	const dispatch = useAppDispatch();
	const cart = useAppSelector(selectCart);

	const count =
		cart.find((i) => {
			return i.id === item.id;
		})?.count ?? 0;

	const handleMinus = () => {
		if (count >= 1) {
			dispatch(toggleCartItemCount({ id: item.id, count: count - 1 }));
		}
	};

	const handlePlus = () => {
		dispatch(toggleCartItemCount({ id: item.id, count: count + 1 }));
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

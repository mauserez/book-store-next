"use client";
import { Button } from "@/src/shared/ui/buttons";
import s from "./PlusMinus.module.css";
import { ComponentProps, useCallback, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { selectCart } from "@/src/shared/redux/slices/cart/cartSlice";
import { ItemDataType } from "@/src/app/api/catalog/route";
import { toggleCartItemCount } from "@/src/shared/redux/slices/cart/asyncThunks/cartItem";

type PlusMinusProps = { item: ItemDataType };
export const PlusMinus = (props: PlusMinusProps) => {
	const { item } = props;
	const dispatch = useAppDispatch();

	const cart = useAppSelector(selectCart);
	const count =
		cart.find((i) => {
			return i.id === item.id;
		})?.count ?? 0;

	const [counter, setCounter] = useState(count);

	const handleMinus = () => {
		if (counter >= 1) {
			setCounter(counter - 1);
			dispatch(toggleCartItemCount({ id: item.id, count: counter - 1 }));
		}
	};

	const handlePlus = () => {
		setCounter(counter + 1);
		dispatch(toggleCartItemCount({ id: item.id, count: counter + 1 }));
	};

	return (
		<Button className={s.plusMinus}>
			<Btn
				disabled={!counter}
				onClick={handleMinus}
				src="/svg/cart/minus.svg"
			/>
			<Counter value={counter} />
			<Btn onClick={handlePlus} src="/svg/cart/plus.svg" />
		</Button>
	);
};

type BtnProps = ComponentProps<"div"> & { src: string; disabled?: boolean };
const Btn = (props: BtnProps) => {
	const { src, disabled = "", ...divProps } = props;
	const disabledClass = disabled ? s.btnDisabled : "";

	return (
		<div className={`${s.btn} ${disabledClass}`} {...divProps}>
			<img src={src} alt="Кнопка корзины" />
		</div>
	);
};

type CounterProps = { value: number };
const Counter = (props: CounterProps) => {
	const { value } = props;
	return <div className={s.counter}>{value}</div>;
};

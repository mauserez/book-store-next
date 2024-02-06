"use client";
import { ComponentProps, ReactNode } from "react";
import s from "./Button.module.css";
import { LineWave } from "react-loader-spinner";
import clsx from "clsx";

type ButtonProps = ComponentProps<"button"> & {
	children: ReactNode;
	loader?: boolean;
};

export default function Button(props: ButtonProps) {
	const { className, children, loader = false, ...buttonProps } = props;

	return (
		<button {...buttonProps} className={clsx(s.button, className)}>
			{loader ? <ButtonLoader /> : null}
			{children}
		</button>
	);
}

const ButtonLoader = () => {
	return (
		<LineWave
			visible={true}
			height="40"
			width="40"
			color="#fff"
			ariaLabel="line-wave-loading"
			wrapperStyle={{}}
			wrapperClass=""
			firstLineColor=""
			middleLineColor=""
			lastLineColor=""
		/>
	);
};

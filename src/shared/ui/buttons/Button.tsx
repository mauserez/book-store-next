import { ComponentProps, ReactNode } from "react";
import s from "./Button.module.css";

type ButtonProps = ComponentProps<"button"> & { children: ReactNode };

export default function Button(props: ButtonProps) {
	const { className, children } = props;
	return <button className={`${s.button} ${className}`}>{children}</button>;
}

import { PropsWithChildren } from "react";
import s from "./PageTitle.module.css";

export default function PageTitle(props: PropsWithChildren) {
	const { children } = props;
	return <div className={s.title}>{children}</div>;
}

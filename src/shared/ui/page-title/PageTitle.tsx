import { ComponentProps } from "react";
import s from "./PageTitle.module.css";

type PageTitleProps = ComponentProps<"div">;
export default function PageTitle(props: PageTitleProps) {
	const { children } = props;
	return <div className={s.title}>{children}</div>;
}

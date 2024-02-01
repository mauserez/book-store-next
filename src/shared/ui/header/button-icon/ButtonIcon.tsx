import Image from "next/image";
import s from "./ButtonIcon.module.css";
import Link from "next/link";

type ButtonIconProps = {
	className: string;
	src: string;
	counter?: number;
	link?: string;
};

export const ButtonIcon = (props: ButtonIconProps) => {
	const { className, src, counter, link } = props;
	const counterContent =
		counter !== undefined ? (
			<div className={s.buttonCounter}>{counter}</div>
		) : null;
	const button = (
		<div className={`${s.headerButton} ${className}`}>
			<Image alt="logo" src={src} width={13} height={17} />
			{counterContent}
		</div>
	);

	if (link) {
		return <Link href={link}>{button}</Link>;
	}

	return button;
};

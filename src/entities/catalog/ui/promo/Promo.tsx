import Image from "next/image";
import s from "./Promo.module.css";

type PromoProps = {
	text: string;
	back: string;
	num: number;
};

export default function Promo(props: PromoProps) {
	const { back, text, num } = props;
	return (
		<div
			style={{ backgroundColor: back }}
			className={`${s.promo} promo-${num}`}
		>
			<span className={s.promoText}>{text}</span>

			<Image
				className={s.promoImage}
				width={57}
				height={14}
				alt="Стрелка"
				src="icons/arrow.svg"
			/>
		</div>
	);
}

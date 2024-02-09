import { Rating } from "@/src/shared/ui/rating";
import { CartItemType } from "@/src/shared/redux/slices/cart/cartSlice";

import s from "./CartItemInfo.module.css";

type CartItemInfoProps = { item: CartItemType };
export default function CartItemInfo(props: CartItemInfoProps) {
	const { item } = props;
	const { author, title, rating, reviews } = item;

	return (
		<div className={s.info}>
			<div className={s.header}>
				<div className={s.authors}>{author}</div>
				<div className={s.title}>{title}</div>
				<Rating reviews={reviews ?? 0} rating={rating} />
			</div>
		</div>
	);
}

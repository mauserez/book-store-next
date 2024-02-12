import { ComponentProps } from "react";
import Image from "next/image";

import { CartItemType } from "@/src/shared/redux/slices/cart/cartSlice";
import { CartItemInfo } from "@/src/entities/cart/ui";

import clsx from "clsx";
import s from "./CartItem.module.css";

type CartItemProps = ComponentProps<"div"> & {
	item: CartItemType;
};

export default function CartItem(props: CartItemProps) {
	const { item, className, ...divProps } = props;

	const imgPlaceholder = "/img/placeholder2.png";
	const bookImage = item.img_url ?? imgPlaceholder;

	return (
		<div className={clsx(s.book, className)} {...divProps}>
			<div className={s.bookImageWrap}>
				<Image
					alt="Книга"
					width={100}
					height={145}
					src={bookImage}
					quality={75}
					priority
				/>
			</div>
			<CartItemInfo item={item} />
		</div>
	);
}

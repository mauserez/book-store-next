import { CatalogItemType } from "@/src/app/api/catalog/route";
import ItemInfo from "../itemInfo/ItemInfo";
import { ComponentProps } from "react";
import Image from "next/image";
import clsx from "clsx";

import s from "./Item.module.css";

export type ItemBehavior = "catalog" | "cart";
type CatalogItemProps = ComponentProps<"div"> & {
	item: CatalogItemType;
	behavior?: ItemBehavior;
};

export default function Item(props: CatalogItemProps) {
	const { item, behavior = "catalog", className, ...divProps } = props;

	if (!item.volumeInfo) {
		return null;
	}

	const imgPlaceholder = "/img/placeholder2.png";
	const { volumeInfo } = item;
	let img = "";

	img = volumeInfo.imageLinks
		? volumeInfo.imageLinks.thumbnail ?? imgPlaceholder
		: imgPlaceholder;

	const bookImage = img;

	let bookClass = "";
	let bookImageWrapClass = "";

	if (behavior === "cart") {
		bookClass = s.bookCart;
		bookImageWrapClass = s.bookImageWrapCart;
	}

	return (
		<div className={clsx(s.book, bookClass, className)} {...divProps}>
			<div className={clsx(s.bookImageWrap, bookImageWrapClass)}>
				<Image
					alt="Книга"
					fill
					src={bookImage}
					quality={75}
					sizes="(max-width: 320px) 100vw, 320px"
					priority
				/>
			</div>
			<ItemInfo behavior={behavior} item={item} />
		</div>
	);
}

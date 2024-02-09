import { ComponentProps } from "react";

import { CatalogItemType } from "@/src/app/api/catalog/route";

import ItemInfo from "../item-Info/ItemInfo";
import Image from "next/image";

import clsx from "clsx";
import s from "./Item.module.css";

type CatalogItemProps = ComponentProps<"div"> & {
	item: CatalogItemType;
};

export default function Item(props: CatalogItemProps) {
	const { item, className, ...divProps } = props;

	if (!item.volumeInfo) {
		return null;
	}

	const imgPlaceholder = "/img/placeholder2.png";
	const { volumeInfo } = item;
	const bookImage = volumeInfo?.imageLinks?.thumbnail ?? imgPlaceholder;

	return (
		<div className={clsx(s.book, className)} {...divProps}>
			<div className={s.bookImageWrap}>
				<Image
					alt="Книга"
					fill
					src={bookImage}
					quality={75}
					sizes="(max-width: 320px) 100vw, 320px"
					priority
				/>
			</div>
			<ItemInfo item={item} />
		</div>
	);
}

import { Rating } from "@/src/shared/ui/rating";
import { numberWithSpaces } from "@/src/shared/utils/number";
import {
	CatalogItemType,
	CatalogItemSaleInfoType,
} from "@/src/app/api/catalog/route";

import { CartItemActionButton } from "@/src/entities/cart/ui";
import { type ItemBehavior } from "../item/Item";
import clsx from "clsx";

import s from "./ItemInfo.module.css";

type ItemInfoProps = { behavior?: ItemBehavior; item: CatalogItemType };
export default function ItemInfo(props: ItemInfoProps) {
	const { item, behavior } = props;
	const { volumeInfo, saleInfo } = item;

	if (!volumeInfo) {
		return null;
	}

	const {
		authors = "",
		title = "",
		averageRating,
		description,
		ratingsCount,
	} = volumeInfo;

	const authorsText = authors ? authors.join(",") : "";

	let titleCartClass = "";
	let infoCartClass = "";
	let authorsCartClass = "";
	let headerCartClass = "";

	if (behavior === "cart") {
		titleCartClass = s.titleCart;
		infoCartClass = s.infoCart;
		authorsCartClass = s.authorsCart;
		headerCartClass = s.headerCart;
	}

	return (
		<div className={clsx(s.info, infoCartClass)}>
			<div className={clsx(s.header, headerCartClass)}>
				<div className={clsx(s.authors, authorsCartClass)}>{authorsText}</div>
				<div className={clsx(s.title, titleCartClass)}>{title}</div>

				<Rating reviews={ratingsCount} rating={averageRating} />
			</div>

			{behavior === "cart" ? null : (
				<>
					<div className={s.description}>{description ?? ""}</div>
					<BookPrice {...saleInfo} />
					<CartItemActionButton item={item} />
				</>
			)}
		</div>
	);
}

export const BookPrice = (props: CatalogItemSaleInfoType) => {
	const { retailPrice } = props;

	if (!retailPrice) {
		return null;
	}

	return (
		<div className={s.price}>
			<span>
				{retailPrice && retailPrice.currencyCode
					? retailPrice.currencyCode
					: null}
			</span>
			<span>{numberWithSpaces(retailPrice.amount)}</span>
		</div>
	);
};

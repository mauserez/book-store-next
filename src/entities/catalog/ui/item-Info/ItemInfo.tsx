import { Rating } from "@/src/shared/ui/rating";
import { numberWithSpaces } from "@/src/shared/utils/number";

import { CatalogItemType } from "@/src/app/api/catalog/route";
import { CartItemActionButton } from "@/src/entities/cart/ui";

import s from "./ItemInfo.module.css";

type ItemInfoProps = { item: CatalogItemType };
export default function ItemInfo(props: ItemInfoProps) {
	const { item } = props;
	const { volumeInfo, saleInfo } = item;

	if (!volumeInfo) {
		return null;
	}

	const {
		authors = [],
		title = "",
		averageRating,
		description = "",
		ratingsCount,
	} = volumeInfo;

	const authorsText = authors.length > 0 ? authors.join(",") : "";
	const price = saleInfo?.retailPrice?.amount ?? null;
	const currency = saleInfo.retailPrice?.currencyCode ?? null;

	return (
		<div className={s.info}>
			<div className={s.header}>
				<div className={s.authors}>{authorsText}</div>
				<div className={s.title}>{title}</div>
				<Rating reviews={ratingsCount} rating={averageRating} />
			</div>

			<div className={s.description}>{description}</div>

			{price ? (
				<div className={s.price}>
					<span>{currency}</span>
					<span>{numberWithSpaces(price)}</span>
				</div>
			) : null}

			<CartItemActionButton itemId={item.id} catalogItem={item} />
		</div>
	);
}

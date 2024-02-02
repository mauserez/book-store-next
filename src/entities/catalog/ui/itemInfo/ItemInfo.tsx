import { Rating } from "@/src/shared/ui/rating";
import { numberWithSpaces } from "@/src/shared/utils/number";
import {
	ItemDataType,
	ItemDataSaleInfoType,
} from "@/src/app/api/catalog/route";

import { CartActionButton } from "@/src/entities/cart/ui";
import s from "./ItemInfo.module.css";

export default function ItemInfo(props: ItemDataType) {
	const { id, volumeInfo, saleInfo } = props;
	const { authors, title, averageRating, description, ratingsCount } =
		volumeInfo;

	const authorsText = authors ? authors.join(",") : "";
	//const text = options.text ? options.text : "Press";

	return (
		<div className={s.info}>
			<div className={s.header}>
				<div className={s.authors}>{authorsText}</div>
				<div className={s.title}>{title}</div>

				<Rating reviews={ratingsCount} rating={averageRating} />
			</div>

			<div className={s.description}>{description ?? ""}</div>

			<BookPrice {...saleInfo} />

			<CartActionButton />
		</div>
	);
}

const BookPrice = (props: ItemDataSaleInfoType) => {
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

/*
export const createBtn = (options: btnOptions) => {
	const text = options.text ? options.text : "Press";
	const className = options.className ? options.className : "";
	const clickCb: Function = options.clickCb ? options.clickCb : () => {};

	const btn = fromHtml(`<button class="btn ${className}">${text}</button>`);

	btn.onclick = () => {
		clickCb(btn);
	};

	return btn;
};

const createItemCartBtn = (item: ApiResponse) => {
	const checkInCartClass = checkItemExistsInCart(item.id);
	let btnText = btnTexts[0];
	let btnClass = "";
	if (checkInCartClass === true) {
		btnText = btnTexts[1];
		btnClass = "active";
	}

	const btn = createBtn({
		text: btnText,
		className: `item-info__cart-btn ${btnClass}`,
		clickCb: (btn: HTMLElement) => {
			btn.classList.toggle("active");

			if (btn.classList.contains("active")) {
				btn.innerHTML = btnTexts[1];
				addItemToCart(item.id);
			} else {
				removeItemFromCart(item.id);
				btn.innerHTML = btnTexts[0];
			}

			const headerCartBtnCounter = document
				.querySelector(".header__cart-btn")
				?.querySelector(".counter");
			if (headerCartBtnCounter) {
				headerCartBtnCounter.innerHTML = cartItemCounter();
			}
		},
	});

	return btn;
};
 */

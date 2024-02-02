import { ItemDataType } from "@/src/app/api/catalog/route";
import ItemInfo from "../itemInfo/ItemInfo";
import s from "./Item.module.css";

export default function Item(props: ItemDataType) {
	const imgPlaceholder = "/img/placeholder2.png";
	const { volumeInfo } = props;
	const img = volumeInfo.imageLinks
		? volumeInfo.imageLinks.thumbnail ?? imgPlaceholder
		: imgPlaceholder;

	const bookImage = img;

	return (
		<div className={s.book}>
			<div
				className={s.bookImage}
				style={{ backgroundImage: `url(${bookImage})` }}
			></div>
			<ItemInfo {...props} />
		</div>
	);
}

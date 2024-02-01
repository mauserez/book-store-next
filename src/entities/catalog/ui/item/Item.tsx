import { ItemDataType } from "@/src/app/api/catalog/route";
import ItemInfo from "../itemInfo/ItemInfo";
import s from "./Item.module.css";

export default function Item(props: ItemDataType) {
	const bookImage =
		props.volumeInfo.imageLinks.thumbnail ?? "assets/img/placeholder2.png";
	return (
		<div className={s.book}>
			<div
				className={s.bookImage}
				style={{ backgroundImage: `url${bookImage}` }}
			></div>
			<ItemInfo {...props} />
		</div>
	);
}

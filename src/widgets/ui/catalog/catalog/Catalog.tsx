import { CategoryList, ItemList } from "..";
import s from "./Catalog.module.css";

export default function Catalog() {
	return (
		<div className={s.wrap}>
			<div className={s.catalog}>
				<CategoryList />
				<ItemList />
			</div>
		</div>
	);
}

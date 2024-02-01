import { CatalogApiProps } from "@/src/app/api/catalog/route";
import { CategoryItem } from "@/src/entities/catalog";
import { CATEGORY_LIST } from "./model";
import s from "./CategoryList.module.css";

export type Category = { subject: string; name: string };
export type CategoryListType = Category[];

type CategoryListProps = {
	categoryList?: CategoryListType;
};

export default function CategoryList(props: CategoryListProps) {
	const { categoryList = CATEGORY_LIST } = props;

	return (
		<aside className={s.categoryList}>
			<aside className={s.fake}></aside>
			{categoryList.map((category, i) => {
				const q = `"subject:${category.subject}"`;
				const apiParams: CatalogApiProps = { q: q };
				const activeClass = i === 0 ? "active" : "";

				return (
					<CategoryItem
						key={i}
						apiOptions={apiParams}
						menuName={category.subject}
						className={activeClass}
					/>
				);
			})}
		</aside>
	);
}

/*
export const createMenu = (menuList: MenuList, bookContainer: HTMLElement) => {
	const header = <HTMLElement>document.querySelector(".header-wrap");

	function setTopToBookMenu(header: HTMLElement) {
		if (header) {
			const addPx = window.innerWidth > 650 ? 45 : 0;
			menu.style.top = `${header.clientHeight + addPx}px`;
		}
	}

	setTopToBookMenu(header);
	window.addEventListener("resize", () => {
		setTopToBookMenu(header);
	});
};

 */

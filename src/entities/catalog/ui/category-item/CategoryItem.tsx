import { CatalogApiProps } from "@/src/app/api/catalog/route";
import s from "./CategoryItem.module.css";

type MenuItemProps = {
	apiOptions: CatalogApiProps;
	menuName: string;
	className: string;
};

export const CategoryItem = (props: MenuItemProps) => {
	const { menuName, className } = props;

	return (
		<div className={`${s.item} ${className ?? ""}`}>
			<div className={s.dot}></div>
			{menuName}
		</div>
	);
};

/*
export const createMenuItem = (
	params: ApiOptions,
	name: string,
	bookContainer: HTMLElement,
	className?: string
) => {
	const li = fromHtml(
		`<div class="book-content__menu__item ${className}">
			<div class="book-content__menu__dot"></div>
			${name}
		</div>`
	);

	li.onclick = () => {
		if (!li.classList.contains("active")) {
			if (li.parentElement?.children) {
				Array.from(li.parentElement.children).forEach((e) => {
					e.classList.remove("active");
				});
			}

			if (window.innerWidth <= 650) {
				li.parentElement?.scrollTo({
					left: li.offsetLeft - li.clientWidth,
					behavior: "smooth",
				});
			}

			li.classList.add("active");

			createItemList(params, bookContainer);
		}
	};

	return li;
};
 */

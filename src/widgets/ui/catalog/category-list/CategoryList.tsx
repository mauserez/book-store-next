"use client";
import { CategoryItem } from "@/src/entities/catalog";
import { CATEGORY_LIST } from "./model";
import { useEffect, useState } from "react";

export type Category = { subject: string; name: string };
export type CategoryListType = Category[];

type CategoryListProps = {
	categoryList?: CategoryListType;
};
import s from "./CategoryList.module.css";

export default function CategoryList(props: CategoryListProps) {
	const { categoryList = CATEGORY_LIST } = props;
	const [top, setTop] = useState<string | undefined>();

	useEffect(() => {
		const resetTop = () => {
			if (window) {
				const header = document.querySelector(".app-header");
				if (header) {
					const addPx = window.innerWidth > 650 ? 45 : -1;
					setTop(`${header.clientHeight + addPx}px`);
				}
			}
		};

		resetTop();

		window.addEventListener("resize", resetTop);
		return () => {
			window.removeEventListener("resize", resetTop);
		};
	}, []);

	return (
		<aside style={{ top: top }} className={s.categoryList}>
			<aside className={s.fake}></aside>
			{categoryList.map((category, i) => {
				const q = `subject:${category.subject}`;
				return (
					<CategoryItem category={q} key={i} menuName={category.subject} />
				);
			})}
		</aside>
	);
}

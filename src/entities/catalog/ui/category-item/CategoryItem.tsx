"use client";

import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";

import {
	selectFilterCategory,
	setFilter,
} from "@/src/shared/redux/slices/catalog/catalogSlice";

type CategoryItemProps = {
	menuName: string;
	category: string;
};
import s from "./CategoryItem.module.css";
import { useEffect, useState } from "react";

export const CategoryItem = (props: CategoryItemProps) => {
	const dispatch = useAppDispatch();

	const { menuName, category } = props;
	const [active, setActive] = useState("");

	const activeCategory = useAppSelector(selectFilterCategory);

	useEffect(() => {
		const active = activeCategory === category ? "active" : "";
		setActive(active);
	}, [activeCategory, category]);

	return (
		<div
			onClick={() => {
				dispatch(setFilter({ q: category }));
			}}
			className={`${s.item}  ${active} `}
		>
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

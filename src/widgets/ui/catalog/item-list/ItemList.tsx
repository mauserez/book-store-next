"use client";

import { Item } from "@/src/entities/catalog";
import s from "./ItemList.module.css";
import {
	selectItems,
	getBooks,
	selectFilter,
	selectApiStatus,
} from "@/src/shared/redux/slices/catalogSlice";

import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { useEffect, useState } from "react";
import LoadMore from "@/src/features/catalog/load-more/LoadMore";
import { Loader } from "@/src/shared/ui/loaders";
import { ItemDataType } from "@/src/app/api/catalog/route";

export default function ItemList() {
	const dispatch = useAppDispatch();
	const catalogItems = useAppSelector(selectItems);
	const catalogFilter = useAppSelector(selectFilter);
	const catalogApiStatus = useAppSelector(selectApiStatus);

	const [itemList, setItemList] = useState<ItemDataType[]>([]);

	useEffect(() => {
		dispatch(getBooks("redraw"));
	}, [catalogFilter, dispatch]);

	useEffect(() => {
		//setItemList(catalogItems);
	}, [catalogItems]);

	return (
		<div className={s.itemListWrap}>
			{catalogApiStatus !== "loading" ? (
				itemList.length > 0 ? (
					<div className={s.itemList}>
						{itemList.map((book, i) => {
							return <Item key={book.id + i} {...book} />;
						})}
						<LoadMore />
					</div>
				) : null
			) : (
				<Loader />
			)}
		</div>
	);
}

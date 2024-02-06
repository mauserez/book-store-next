"use client";
import { Item } from "@/src/entities/catalog";

import {
	selectItems,
	selectFilter,
	selectApiStatus,
} from "@/src/shared/redux/slices/catalog/catalogSlice";

import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { useEffect, useState } from "react";
import { getBooks } from "@/src/shared/redux/slices/catalog/asyncThunks";

import { LoadMore } from "@/src/features/catalog/load-more";
import { Loader } from "@/src/shared/ui/loaders";
import { CatalogItemType } from "@/src/app/api/catalog/route";

import s from "./ItemList.module.css";

export default function ItemList() {
	const dispatch = useAppDispatch();
	const catalogItems = useAppSelector(selectItems);
	const catalogFilter = useAppSelector(selectFilter);
	const catalogApiStatus = useAppSelector(selectApiStatus);

	const [mounted, setMounted] = useState<boolean>(false);
	const [itemList, setItemList] = useState<CatalogItemType[]>([]);

	useEffect(() => {
		dispatch(getBooks("redraw"));
	}, [catalogFilter, dispatch]);

	useEffect(() => {
		setItemList(catalogItems);
		setMounted(true);
	}, [catalogItems]);

	return (
		<div className={s.itemListWrap}>
			{catalogApiStatus !== "loading" ? (
				itemList && itemList.length > 0 ? (
					<div className={s.itemList}>
						{itemList.map((book, i) => {
							return <Item key={book.id + i + Math.random()} item={book} />;
						})}
					</div>
				) : mounted ? (
					<NoItems />
				) : null
			) : (
				<Loader />
			)}

			{itemList && itemList.length > 0 && catalogApiStatus !== "loading" ? (
				<LoadMore />
			) : null}
		</div>
	);
}

const NoItems = () => {
	return (
		<div className={s.noItems}>
			<div>No items found. </div>
			Please change search settings...
		</div>
	);
};

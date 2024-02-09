import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import { selectApiStatus } from "@/src/shared/redux/slices/catalog/catalogSlice";
import { getBooks } from "@/src/shared/redux/slices/catalog/thunks";
import { Button } from "@/src/shared/ui/buttons";
import s from "./LoadMore.module.css";

export default function LoadMore() {
	const dispatch = useAppDispatch();
	const apiStatus = useAppSelector(selectApiStatus);
	const isLoadMore = apiStatus === "loading-more" ? true : false;

	return apiStatus !== "nomore" ? (
		<Button
			type="button"
			loader={isLoadMore}
			onClick={() => {
				dispatch(getBooks("loadmore"));
			}}
			className={s.loadMore}
		>
			LOAD MORE
		</Button>
	) : null;
}

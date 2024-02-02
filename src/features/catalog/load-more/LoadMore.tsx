import { useAppDispatch } from "@/src/shared/redux/hooks";
import { getBooks } from "@/src/shared/redux/slices/catalogSlice";
import s from "./LoadMore.module.css";

export default function LoadMore() {
	const dispatch = useAppDispatch();

	return (
		<button
			onClick={() => {
				dispatch(getBooks("loadmore"));
			}}
			className={s.loadMore}
			type="button"
		>
			LOAD MORE
		</button>
	);
}

import { Button } from "@/src/shared/ui/buttons";
import { createCartItem } from "@/src/shared/redux/slices/cart/asyncThunks/cart";
import { ItemDataType } from "@/src/app/api/catalog/route";
import { useAppDispatch } from "@/src/shared/redux/hooks";

export default function AddToCart(props: { item: ItemDataType }) {
	const { item } = props;
	const dispatch = useAppDispatch();

	return (
		<Button
			onClick={() => {
				dispatch(createCartItem(item));
			}}
		>
			BUY NOW
		</Button>
	);
}

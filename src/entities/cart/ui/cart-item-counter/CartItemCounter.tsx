import { useAppDispatch, useAppSelector } from "@/src/shared/redux/hooks";
import AddToCart from "@/src/features/cart/ui/add-to-cart/AddToCart";
import { ItemDataType } from "@/src/app/api/catalog/route";

export default function CartActionButton(props: { item: ItemDataType }) {
	const cart = useAppSelector;
	const { item } = props;

	return <AddToCart item={item} />;
}

import { useAppSelector } from "@/src/shared/redux/hooks";
import AddToCart from "@/src/features/cart/ui/add-to-cart/AddToCart";
import { ItemDataType } from "@/src/app/api/catalog/route";
import { selectCart } from "@/src/shared/redux/slices/cart/cartSlice";
import { PlusMinus } from "@/src/features/cart/ui/plus-minus/PlusMinus";

export default function CartItemActionButton(props: { item: ItemDataType }) {
	const cart = useAppSelector(selectCart);
	const { item } = props;
	const isInCart = cart.find((cartItem) => item.id === cartItem.id);

	return isInCart ? <PlusMinus item={item} /> : <AddToCart item={item} />;
}

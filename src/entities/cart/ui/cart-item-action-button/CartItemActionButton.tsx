import { useAppSelector } from "@/src/shared/redux/hooks";
import AddToCart from "@/src/features/cart/ui/add-to-cart/AddToCart";
import { CatalogItemType } from "@/src/app/api/catalog/route";
import { selectCart } from "@/src/shared/redux/slices/cart/cartSlice";
import { PlusMinus } from "@/src/features/cart/ui/plus-minus/PlusMinus";
import { ComponentProps } from "react";

type CartItemActionButtonProps = ComponentProps<"div"> & {
	item: CatalogItemType;
};
export default function CartItemActionButton(props: CartItemActionButtonProps) {
	const cart = useAppSelector(selectCart);
	const { item, ...otherProps } = props;
	const isInCart = cart.find((cartItem) => item.id === cartItem.id);

	return (
		<div {...otherProps}>
			{isInCart ? <PlusMinus item={item} /> : <AddToCart item={item} />}
		</div>
	);
}

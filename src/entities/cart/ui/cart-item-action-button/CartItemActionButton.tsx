import { useAppSelector } from "@/src/shared/redux/hooks";
import AddToCart from "@/src/features/cart/ui/add-to-cart/AddToCart";
import { CatalogItemType } from "@/src/app/api/catalog/route";
import { selectCart } from "@/src/shared/redux/slices/cart/cartSlice";
import { ToggleCartItem } from "@/src/features/cart/ui/toggle-cart-item-count/ToggleCartItemCount";
import { ComponentProps } from "react";

type CartItemActionButtonProps = ComponentProps<"div"> & {
	itemId: string;
	catalogItem?: CatalogItemType;
};
export default function CartItemActionButton(props: CartItemActionButtonProps) {
	const cart = useAppSelector(selectCart);
	const { itemId, catalogItem, ...otherProps } = props;

	const isInCart =
		cart.length > 0
			? cart.find((cartItem) => itemId === cartItem.item_id)
			: false;

	return (
		<div {...otherProps}>
			{isInCart ? <ToggleCartItem itemId={itemId} /> : null}
			{!isInCart && catalogItem ? <AddToCart item={catalogItem} /> : null}
		</div>
	);
}

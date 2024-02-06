import { TrashFill } from "react-bootstrap-icons";
import s from "./RemoveItem.module.css";
import { useAppDispatch } from "@/src/shared/redux/hooks";
import { deleteCartItem } from "@/src/shared/redux/slices/cart/asyncThunks/cartItem";

type RemoveFromCartProps = { cartItemId: string };
export const RemoveFromCart = (props: RemoveFromCartProps) => {
	const dispatch = useAppDispatch();
	const { cartItemId } = props;

	return (
		<div className={s.removeBtn}>
			<TrashFill
				size={16}
				onClick={() => {
					dispatch(deleteCartItem(cartItemId));
				}}
			/>
		</div>
	);
};

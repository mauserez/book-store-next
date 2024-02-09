import { TrashFill } from "react-bootstrap-icons";
import s from "./DeleteCartItem.module.css";
import { useAppDispatch } from "@/src/shared/redux/hooks";
import { deleteCartItem } from "@/src/shared/redux/slices/cart/thunks/cartItem";

type DeleteCartItemProps = { id: number };
export const DeleteCartItem = (props: DeleteCartItemProps) => {
	const dispatch = useAppDispatch();
	const { id } = props;

	return (
		<div className={s.removeBtn}>
			<TrashFill
				size={16}
				onClick={() => {
					dispatch(deleteCartItem(id));
				}}
			/>
		</div>
	);
};

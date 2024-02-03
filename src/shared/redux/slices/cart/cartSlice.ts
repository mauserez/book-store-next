import { ItemDataType } from "@/src/app/api/catalog/route";
import { createAppSlice } from "../../createAppSlice";
import { createCartItem, clearCart, getCart } from "./asyncThunks/cart";
import { useAppDispatch } from "../../hooks";

export type CartItemType = {
	id: number;
	item: ItemDataType;
	count: number;
};

export type CartStateType = {
	cart: CartItemType[];
	status: "idle" | "refreshed";
	creation: boolean;
};

const initialState: CartStateType = {
	cart: [],
	status: "idle",
	creation: false,
};

export const cartSlice = createAppSlice({
	name: "cart",
	initialState,
	reducers: (create) => ({
		setCreation: create.reducer((state) => {
			state.creation = true;
		}),
	}),
	extraReducers: (builder) => {
		/*Обновление корзины */
		builder.addCase(getCart.fulfilled, (state, action) => {
			state.cart = action.payload;
		});

		/* Добавление нового объекта */
		builder.addCase(createCartItem.fulfilled, (state) => {
			state.status = "refreshed";
			getCart();
		});

		builder.addCase(clearCart.fulfilled, (state) => {
			state.status = "refreshed";
		});
	},
	selectors: {
		selectCart: (state) => state.cart,
	},
});

export const { selectCart } = cartSlice.selectors;

const cartReducer = cartSlice.reducer;

export default cartReducer;

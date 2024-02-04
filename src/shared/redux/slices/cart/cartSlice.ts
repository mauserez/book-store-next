import { ItemDataType } from "@/src/app/api/catalog/route";
import { createAppSlice } from "../../createAppSlice";
import { createCartItem, clearCart, getCart } from "./asyncThunks/cart";
import { toggleCartItemCount } from "./asyncThunks/cartItem";

export type CartItemType = {
	id: string;
	item: ItemDataType;
	count: number;
};

export type CartStateType = {
	cart: CartItemType[];
	status: "idle" | "refreshed";
};

const initialState: CartStateType = {
	cart: [],
	status: "idle",
};

export const cartSlice = createAppSlice({
	name: "cart",
	initialState,
	reducers: (create) => ({
		/* countItemInCart: create.reducer((state, action) => {
			state.cart =
		}), */
	}),
	extraReducers: (builder) => {
		/*Получить всю корзину*/
		builder.addCase(getCart.fulfilled, (state, action) => {
			state.cart = action.payload;
			state.status = "idle";
		});

		/* Добавление нового объекта корзины */
		builder.addCase(createCartItem.fulfilled, (state) => {
			state.status = "refreshed";
		});

		/* +- 1 объект корзины */
		builder.addCase(toggleCartItemCount.fulfilled, (state) => {
			state.status = "refreshed";
		});

		/* Удалить объект корзины */
		/* builder.addCase(createCartItem.fulfilled, (state) => {
			state.status = "refreshed";
		}); */

		/* Очистка корзины */
		builder.addCase(clearCart.fulfilled, (state) => {
			state.status = "refreshed";
		});
	},
	selectors: {
		selectCart: (state) => state.cart,
		selectCartLen: (state) => {
			let len = 0;
			state.cart.map((item) => {
				len += item.count;
			});
			return len;
		},
		selectStatus: (state) => state.status,
	},
});

export const { selectCart, selectCartLen, selectStatus } = cartSlice.selectors;

const cartReducer = cartSlice.reducer;

export default cartReducer;

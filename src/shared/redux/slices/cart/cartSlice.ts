import { createAppSlice } from "../../createAppSlice";
import { clearCart, getCart } from "./thunks/cart";
import {
	createCartItem,
	deleteCartItem,
	toggleCartItemCount,
} from "./thunks/cartItem";

export type CartItemType = {
	id: number;
	item_id: string;
	price: number;
	user_id: number | null;
	img_url: string | null;
	title: string | null;
	description: string;
	rating: number | null;
	reviews: number | null;
	author: string | null;
	delivery: string | null;
	currency: string;
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
	reducers: () => ({
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
		/* builder.addCase(createCartItem.rejected, (state) => {
			state.status = "refreshed";
		}); */

		/* +- 1 объект корзины */
		builder.addCase(toggleCartItemCount.fulfilled, (state) => {
			state.status = "refreshed";
		});

		/* Удалить объект корзины */
		builder.addCase(deleteCartItem.fulfilled, (state) => {
			state.status = "refreshed";
		});

		/* Очистка корзины */
		builder.addCase(clearCart.fulfilled, (state) => {
			state.status = "refreshed";
		});
	},
	selectors: {
		selectCart: (state) => state.cart,
		selectCartLen: (state) => {
			let len = 0;
			if (state.cart.length > 0) {
				state.cart.forEach((i) => {
					len += i.count;
				});
			}

			return len;
		},
		selectStatus: (state) => state.status,
	},
});

export const { selectCart, selectCartLen, selectStatus } = cartSlice.selectors;

const cartReducer = cartSlice.reducer;

export default cartReducer;

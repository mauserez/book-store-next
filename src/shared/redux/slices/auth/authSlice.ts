/* import { makeTempUserId } from "@/src/shared/utils/user";
import { createAppSlice } from "../../createAppSlice";

type AuthStateType = {
	userId: number | null;
	tempUserId: string | null;
	auth: boolean;
};

const initialState: AuthStateType = {
	userId: null,
	tempUserId: makeTempUserId(64),
	auth: false,
};

export const cartSlice = createAppSlice({
	name: "cart",
	initialState,
	reducers: () => ({}),
	extraReducers: (builder) => {},
	selectors: {
		selectUserId: (state) => state.userId,
		selectTempUserId: (state) => state.tempUserId,
	},
});

export const { selectUserId, selectTempUserId } = cartSlice.selectors;

const authReducer = cartSlice.reducer;

export default authReducer;
 */

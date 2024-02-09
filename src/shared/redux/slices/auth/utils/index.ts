import {
	GetThunkAPI,
	AsyncThunkConfig,
} from "@reduxjs/toolkit/dist/createAsyncThunk";
import { RootState } from "../../../store";

export function getStoreUsers(store: GetThunkAPI<AsyncThunkConfig>) {
	const { auth } = store.getState() as RootState;
	return { tempUserId: auth.tempUserId, userId: auth.userId };
}

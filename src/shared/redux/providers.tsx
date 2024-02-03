"use client";

/* Core */
import { Provider } from "react-redux";
import { appStore, appPersistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { useEffect } from "react";
import { getCart } from "./slices/cart/asyncThunks/cart";
import { useAppDispatch } from "./hooks";

export const Providers = (props: React.PropsWithChildren) => {
	return (
		<Provider store={appStore}>
			<PersistGate loading={null} persistor={appPersistor}>
				{() => {
					return props.children;
				}}
			</PersistGate>
		</Provider>
	);
};

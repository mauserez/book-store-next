"use client";
/* Core */
import { Provider } from "react-redux";
import { appStore, appPersistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import cookie from "js-cookie";
import { makeTempUserId } from "../utils/user";

export const Providers = (props: React.PropsWithChildren) => {
	if (!cookie.get("tempUserId")) {
		cookie.set("tempUserId", makeTempUserId(200));
	}
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

"use client";

/* Core */
import { Provider } from "react-redux";
import { appStore } from "./store";
//import persistGate

export const Providers = (props: React.PropsWithChildren) => {
	return <Provider store={appStore}>{props.children}</Provider>;
};

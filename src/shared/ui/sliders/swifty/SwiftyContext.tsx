"use client";

import { createContext } from "react";

type SlideType = "next" | "prev" | number;
type PauseStatusType = "on" | "off";
export type HandleSlideType = (slide: SlideType) => void;
export type HandlePauseType = (status: PauseStatusType) => void;

export type SwiftyContextActionsType = {
	handleSlide: HandleSlideType;
	handlePause: HandlePauseType;
};

export type SwiftyContextType = {
	state: {
		activeIdx: number;
		img: string[];
		pause: boolean;
	};
	actions: SwiftyContextActionsType;
};

export const SwiftyContext = createContext<SwiftyContextType>({
	state: {
		activeIdx: 0,
		img: [],
		pause: false,
	},
	actions: {
		handleSlide: () => {},
		handlePause: () => {},
	},
});

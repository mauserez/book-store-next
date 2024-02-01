import { SwiftyProps } from "../Swifty";
import {
	HandlePauseType,
	SwiftyContext,
	SwiftyContextType,
} from "../SwiftyContext";
import { useState, useCallback, useEffect, useRef, Context } from "react";
import { HandleSlideType } from "../SwiftyContext";

export default function useSwifty(
	props: SwiftyProps
): [Context<SwiftyContextType>, SwiftyContextType] {
	const { img, seconds = 3 } = props;
	const lastIndex = img.length - 1;

	const initState = {
		img: img,
		activeIdx: 0,
		pause: false,
	};

	const [state, setState] = useState(initState);

	const handleSlide: HandleSlideType = useCallback(
		(slide) => {
			if (typeof slide === "number") {
				setState({ ...state, activeIdx: slide });
			} else {
				if (slide === "next") {
					setState({
						...state,
						activeIdx: state.activeIdx === lastIndex ? 0 : state.activeIdx + 1,
					});
				} else {
					setState({
						...state,
						activeIdx: state.activeIdx === 0 ? lastIndex : state.activeIdx - 1,
					});
				}
			}
		},
		[state, lastIndex]
	);

	const handlePause: HandlePauseType = (status) => {
		setState({ ...state, pause: !state.pause });
	};

	const intervalRef = useRef<NodeJS.Timeout | null>(null);
	useEffect(() => {
		if (!state.pause) {
			const i = setInterval(() => handleSlide("next"), seconds * 1000);
			intervalRef.current = i;
			return () => {
				clearInterval(i);
			};
		}
	}, [handleSlide, state.pause, seconds]);

	const contextValue = {
		state: state,
		actions: { handleSlide, handlePause },
	};

	return [SwiftyContext, contextValue];
}

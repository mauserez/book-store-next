"use client";

import { Slides, Dots, Arrows } from ".";
import useSwifty from "./hooks/useSwifty";
import s from "./Swifty.module.css";

export type SwiftyProps = {
	img: string[];
	seconds?: number;
	withArrows?: boolean;
};

export const Swifty = (props: SwiftyProps) => {
	const { withArrows = false } = props;

	const [SwiftyContext, value] = useSwifty(props);
	const actions = value.actions;

	return (
		<SwiftyContext.Provider value={value}>
			<div
				onMouseEnter={() => {
					actions.handlePause("on");
				}}
				onMouseLeave={() => {
					actions.handlePause("off");
				}}
				className={s.slider}
			>
				{withArrows ? <Arrows /> : null}
				<Slides />
				<Dots />
			</div>
		</SwiftyContext.Provider>
	);
};

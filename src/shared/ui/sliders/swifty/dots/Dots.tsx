import { useContext } from "react";
import { SwiftyContext } from "../SwiftyContext";
import clsx from "clsx";
import s from "./Dots.module.css";

export default function Dots() {
	const { state, actions } = useContext(SwiftyContext);
	const { img, activeIdx } = state;
	const { handleSlide } = actions;

	return (
		<ul className={s.dots}>
			{img.map((src, i) => {
				return (
					<li
						onClick={() => {
							handleSlide(i);
						}}
						key={i}
						className={clsx(s.dot, activeIdx === i ? s.active : null)}
					></li>
				);
			})}
		</ul>
	);
}

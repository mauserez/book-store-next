import { useContext } from "react";
import { SwiftyContext } from "../SwiftyContext";
import s from "./Arrows.module.css";
import clsx from "clsx";

export default function Arrows() {
	const { actions } = useContext(SwiftyContext);
	const { handleSlide } = actions;

	return (
		<div className={s.arrows}>
			<span
				onClick={() => handleSlide("prev")}
				className={clsx(s.arrow, s.arrowPrev)}
			></span>
			<span
				onClick={() => handleSlide("next")}
				className={clsx(s.arrow, s.arrowNext)}
			></span>
		</div>
	);
}

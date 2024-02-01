import { useContext } from "react";
import s from "./Slides.module.css";
import { SwiftyContext } from "../SwiftyContext";

export default function Slides() {
	const { state } = useContext(SwiftyContext);
	const { img, activeIdx } = state;

	return (
		<div className={s.wrap}>
			<ul className={s.container}>
				{img.map((src, i) => {
					return (
						<li
							key={i}
							className={`${s.slide} ${activeIdx !== i ? "hidden" : "active"}`}
						>
							<img src={`${src}`} alt="Слайд" />
						</li>
					);
				})}
			</ul>
		</div>
	);
}

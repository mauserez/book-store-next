import { useContext } from "react";
import { SwiftyContext } from "../SwiftyContext";
import Image from "next/image";
import clsx from "clsx";
import s from "./Slides.module.css";

export default function Slides() {
	const { state } = useContext(SwiftyContext);
	const { img, activeIdx } = state;

	return (
		<ul className={s.container}>
			{img.map((src, i) => {
				const isHidden = activeIdx !== i;

				return (
					<li
						key={i}
						className={clsx(s.slide, {
							[s.slideHidden]: isHidden,
						})}
					>
						<Image
							priority
							className={s.slideImage}
							sizes={
								"(max-width: 414px) 414px, (max-width: 768px) 768px, (max-width: 1096px) 100vw, 1100px"
							}
							fill
							quality={80}
							src={`${src}`}
							alt="Слайд"
						/>
					</li>
				);
			})}
		</ul>
	);
}

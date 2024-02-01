import { SvgFilled } from "@/src/shared/utils/svg";
import { chunkBy } from "@/src/shared/utils/array";
import s from "./Rating.module.css";

type RatingProps = {
	rating: number | null | undefined;
	className?: string;
	reviews?: number;
};

export default function Rating(props: RatingProps) {
	const { rating, reviews } = props;

	if (!rating && !reviews) {
		return null;
	}

	const starMap = [0, 1, 2, 3, 4];
	const starData = chunkBy(rating ?? 0, 100);

	return (
		<div className={s.rating}>
			<div className={s.stars}>
				{starMap.map((i) => (
					<SvgFilled percentage={starData[i]} width={12} height={11} key={i} />
				))}
			</div>
			{reviews ? <div className={s.reviews}>{reviews} review</div> : null}
		</div>
	);
}

import { Swifty } from "@/src/shared/ui/sliders/swifty";
import s from "./Banner.module.css";
import { Promo } from "@/src/entities/catalog";

export default function Banner() {
	const banners = [
		"/slides/banner1.jpg",
		"/slides/banner2.jpg",
		"/slides/banner3.jpg",
	];

	const promos = [
		{
			text: "change old book on new",
			back: "#9E98DC",
		},
		{
			text: "top 100 books 2022",
			back: "#FF8FE6",
		},
	];

	return (
		<section className={`${s.banner}`}>
			{promos.map((pr, i) => {
				const promo = { ...pr, num: i + 1 };
				return <Promo key={i} {...promo} />;
			})}

			<Swifty img={banners} />
		</section>
	);
}

import { Catalog, Banner } from "@/src/widgets/ui/catalog";
import s from "./page.module.css";

export default function HomePage() {
	return (
		<section>
			<Banner />
			<Catalog />
		</section>
	);
}

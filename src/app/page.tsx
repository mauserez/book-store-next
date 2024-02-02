import Banner from "@/src/widgets/ui/catalog/banner/Banner";
import Catalog from "@/src/widgets/ui/catalog/catalog/Catalog";

import styles from "./page.module.css";
export default function HomePage() {
	return (
		<>
			<Banner />
			<Catalog />
		</>
	);
}

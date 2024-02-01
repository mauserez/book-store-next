import Image from "next/image";
import styles from "./page.module.css";
import Banner from "@/src/widgets/ui/catalog/banner/Banner";
import Catalog from "@/src/widgets/ui/catalog/catalog/Catalog";

export default function HomePage() {
	return (
		<>
			<Banner />
			<Catalog />
		</>
	);
}

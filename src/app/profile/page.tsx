import { PageTitle } from "@/src/shared/ui/page-title";
import { AboutMe, Info } from "@/src/widgets/ui/profile";
import s from "./page.module.css";

export default function ProfilePage() {
	return (
		<section className={s.wrap}>
			<div>
				<PageTitle>PROFILE</PageTitle>
				<Info />
			</div>
			<AboutMe />
		</section>
	);
}

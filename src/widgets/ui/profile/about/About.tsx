import s from "./About.module.css";
export default function AboutMe() {
	return (
		<div className={s.card}>
			<div className={s.title}>ABOUT ME</div>
			<div className={s.info}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed in ante
				consequat, ornare nisi et, ultrices libero. Nunc nibh dolor, maximus
				quis auctor nec, tempor quis ipsum. Proin mollis pellentesque nulla ac
				varius.
			</div>
		</div>
	);
}

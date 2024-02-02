import { Button } from "@/src/shared/ui/buttons";
import s from "./Info.module.css";
import Image from "next/image";

export default function Info() {
	return (
		<div className={s.card}>
			<div className={s.avatar}>
				<Image
					alt="profile"
					src={"/svg/profile-avatar.svg"}
					objectFit="cover"
					fill
					width={235}
					height={235}
				/>
			</div>
			<div className={s.info}>
				<div className={s.block}>
					<div className={s.title}>YOUR NAME</div>
					<div className={s.value}>John Smith</div>
				</div>
				<div className={s.block}>
					<div className={s.title}>YOUR EMAIL</div>
					<div className={s.value}>example@mail.com</div>
				</div>

				<Button>EDIT PROFILE</Button>
			</div>
		</div>
	);
}

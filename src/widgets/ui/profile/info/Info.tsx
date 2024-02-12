"use client";
import { Button } from "@/src/shared/ui/buttons";
import Image from "next/image";
import s from "./Info.module.css";
import { useSessionUser } from "@/src/shared/utils/clientSession";

export default function Info() {
	const user = useSessionUser();

	return (
		<div className={s.card}>
			<div className={s.avatar}>
				<Image alt="profile" src={"/svg/profile-avatar.svg"} fill />
			</div>
			<div className={s.info}>
				<div className={s.block}>
					<div className={s.title}>YOUR NAME</div>
					<div className={s.value}>{user?.id}</div>
				</div>
				<div className={s.block}>
					<div className={s.title}>YOUR EMAIL</div>
					<div className={s.value}>{user?.email}</div>
				</div>

				<Button className={s.editProfleButton}>EDIT PROFILE</Button>
			</div>
		</div>
	);
}

import React from "react";
import s from "./Logo.module.css";
import Link from "next/link";

export const Logo = () => {
	return (
		<Link className={s.logoLink} href="/">
			<div className={s.logo}>Bookshop</div>
		</Link>
	);
};

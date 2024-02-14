"use client";
import React, { useState } from "react";
import clsx from "clsx";
import s from "./Nav.module.css";
import Link from "next/link";

export const Nav = () => {
	const headerNavList = [
		{ label: "books", link: "/" },
		{ label: "audiobooks", link: "/" },
		{ label: "stationery & gifts", link: "/" },
		{ label: "blog", link: "/" },
	];
	const [activeIdx, setActiveIdx] = useState(0);

	return (
		<nav>
			<ul className={s.nav}>
				{headerNavList.map((navItem, idx) => {
					return (
						<li
							key={idx}
							onClick={() => {
								setActiveIdx(idx);
							}}
							className={clsx(s.navItem, idx === activeIdx ? "active" : "")}
						>
							<Link className={s.navItemLink} href={navItem.link}>{navItem.label}</Link>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

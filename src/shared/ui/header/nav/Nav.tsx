"use client";
import React, { useState } from "react";
import s from "./Nav.module.css";

export const Nav = () => {
	const headerNavList = ["books", "audiobooks", "stationery & gifts", "blog"];
	const [activeIdx, setActiveIdx] = useState(0);

	return (
		<nav>
			<ul className={s.nav}>
				{headerNavList.map((navName, idx) => {
					return (
						<li
							key={idx}
							onClick={() => {
								setActiveIdx(idx);
							}}
							className={`${s.navItem} ${idx === activeIdx ? "active" : ""}`}
						>
							{navName}
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

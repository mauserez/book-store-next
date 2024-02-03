import React from "react";

type SvgFilledProps = {
	percentage: number;
	width: number;
	height: number;
	fillColor?: string;
	percFillColor?: string;
};

export const SvgFilled = (props: SvgFilledProps) => {
	const {
		percentage,
		width,
		height,
		fillColor = "#EEEDF5",
		percFillColor = "#F2C94C",
	} = props;

	const hash = Math.random();
	const urlFill = `gradient_${hash}`;
	const percFill = percentage ? percentage : 0;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${width} ${height}`}
			width={width}
			height={height}
			style={{ fill: "none" }}
		>
			<defs>
				<linearGradient id={urlFill} x1="0%" x2="100%" y1="0%" y2="0%">
					<stop offset={`${percFill}%`} stopColor={percFillColor}></stop>
					<stop offset="0%" stopColor={fillColor}></stop>
				</linearGradient>
			</defs>
			<path
				d="M6 0L7.80568 3.5147L11.7063 4.1459L8.92165 6.9493L9.52671 10.8541L6 9.072L2.47329 10.8541L3.07835 6.9493L0.293661 4.1459L4.19432 3.5147L6 0Z"
				fill={`url(#${urlFill})`}
			></path>
		</svg>
	);
};

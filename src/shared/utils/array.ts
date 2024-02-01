export const chunkBy = (num: number, n: number) => {
	const arr: number[] = [];
	while (num > 0) {
		arr.push(Math.min(num, n));
		num = num - n;
	}

	return arr;
};

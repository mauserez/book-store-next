export const chunkBy = (num: number, n: number) => {
	const arr: number[] = [];
	while (num > 0) {
		arr.push(Math.min(num, n));
		num = num - n;
	}

	return arr;
};

export function removeArrayOfObjDuplicates<T>(items: T[], key: keyof T) {
	return items.filter(
		(value, index, self) =>
			index === self.findIndex((t) => t[key] === value[key])
	);
}

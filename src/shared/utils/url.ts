export const splitSearchUrl = (params = "") => {
	const urlQueryToObj = params === "" ? window.location.search : params;

	return urlQueryToObj
		.slice(1)
		.split("&")
		.map((p) => p.split("="))
		.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
};

export const NextSplitSearchUrl = (params = "") => {
	const urlQueryToObj = params === "" ? "" : params;

	return urlQueryToObj
		.slice(1)
		.split("&")
		.map((p) => p.split("="))
		.reduce((obj, [key, value]) => ({ ...obj, [key]: value }), {});
};

import axios, { AxiosError } from "axios";

export const showError = (error: AxiosError | unknown) => {
	if (axios.isAxiosError(error)) {
		console.log(error.response?.status);
		console.log(error.response?.statusText);
		console.log(error.response?.data);
	} else {
		console.log(error);
	}
};

import axios, { AxiosError } from "axios";

export const errorText = (error: AxiosError | unknown) => {
	if (axios.isAxiosError(error)) {
		return error.response?.data?.message ?? "";
	} else {
		return error;
	}
};

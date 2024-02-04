import axios from "axios";

const jsonServer = axios.create({
	baseURL: process.env.NEXT_PUBLIC_JSON_SERVER,
	headers: {
		"Content-Type": "application/json",
	},
});

export default jsonServer;

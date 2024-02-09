import axios from "axios";

export const cartApi = axios.create({
	"baseURL": "/api/cart",
});

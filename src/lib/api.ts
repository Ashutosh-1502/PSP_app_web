import { env } from "@/env.mjs";
import axios, { type AxiosError } from "axios";
import { isClient } from "@/lib/utils/is-client";
import { clearCookies } from "@/module/auth/utils/helpers";

const apiUrl = env.NEXT_PUBLIC_API_URL;

const HEADERS = {
	"Content-Type": "application/json",
};

const apiClient = axios.create({
	baseURL: apiUrl,
	headers: {
		...HEADERS,
	},
	withCredentials: true,
});

// Response interceptor
export type ErrorResponseType = {
	message: string;
};

apiClient.interceptors.response.use(
	(response) => {
		return response;
	},
	(error: AxiosError<ErrorResponseType>) => {
		const status = error?.response?.status;
		const errorMessage = error?.response?.data?.message?.toLowerCase() || "";

		console.log("error message in api.ts", status, errorMessage);

		// Check for 401 status and token-related errors
		if (status === 401 && errorMessage.includes("invalid token")) {
			console.log("api.ys file called");
			console.log(status, errorMessage);
			clearCookies();

			// Redirect to signin page
			if (isClient) {
				window.location.href = "/signin";
			}
		}

		// Reject the promise with the error so it can be handled by the calling code
		return Promise.reject(error);
	}
);

export { apiClient, apiUrl };

import {
	type UserLoginDataType,
	type LoginResponseType,
	type UserRegisterDataType,
} from "@/module/auth/types";
import { apiClient } from "@/lib/api";
import type { NSignUpApiResponseType } from "@/types";
import { useMutation } from "@tanstack/react-query";
import type {LogoutResponseType } from "@/module/auth/types";

const API_AUTH_URL = "/auth";

export const useAuthAPI = () => {
	const useLoginMutation = useMutation({
		mutationFn: async (userData: UserLoginDataType) => {
			const response = await apiClient.post<LoginResponseType>(`${API_AUTH_URL}/login`, userData);
			return response.data.data;
		},
	});

	const useRegisterMutation = useMutation({
		mutationFn: async (userData: UserRegisterDataType) => {
			const response = await apiClient.post<NSignUpApiResponseType>(`${API_AUTH_URL}/register`, userData);
			return response.data.data;
		},
	});

	const useLogoutMutation = useMutation({
		mutationFn: async () => {
			const response = await apiClient.post<LogoutResponseType>(`${API_AUTH_URL}/logout`);
			return response.data.data;
		},
	});

	return {
		useLoginMutation,
		useRegisterMutation,
		useLogoutMutation,
	};
};

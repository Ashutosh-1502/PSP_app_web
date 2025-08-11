import { useMutation, useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/api";
import type {
	GetUserDataResponseType,
} from "@/module/profile/types";

export const useProfileAPI = () => {

	const useGetUserData = () => {
		return useQuery({
			queryKey: ["userData"],
			queryFn: async () => {
				const response = await apiClient.get<GetUserDataResponseType>(`/user/me`);
				return response.data.data;
			},
			enabled: true,
			refetchOnWindowFocus: false,
		});
	};

	return {
		useGetUserData,
	};
};

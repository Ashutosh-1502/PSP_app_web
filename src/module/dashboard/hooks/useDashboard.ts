import { apiClient } from "@/lib/api";
import type { GetAllDashboardResponseType, NotificationPayload} from "@/module/dashboard/types/index"
import { STATUS } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";

const API_ADMIN_URL = "/admin/dashboard";

export const useDashboardAPI = () => {
	const useGetDashboardDataQuery = () => {
		return useQuery({
			queryKey: ["dashboardData"],
			queryFn: async () => {
				const res = await apiClient.get<GetAllDashboardResponseType>(`${API_ADMIN_URL}/dashboard-details`);
				return res.data.data;
			},
		});
	};

	const useManageUserAPI = useMutation({
		mutationFn: async ({ id, operation }: { id: string; operation: STATUS }) => {
			try {
				const res = await apiClient.post(`${API_ADMIN_URL}/manage-users/${id}`, { operation });
				return res;
			} catch (err) {
				console.log(err);
			}
		},
	});

	const useNewAnnouncementAPI = useMutation({
		mutationFn: async (notification: NotificationPayload) => {
			try {
				const res = await apiClient.post(`${API_ADMIN_URL}/new-announcement`, notification);
				return res;
			} catch (err) {
				console.log(err);
			}
		},
	});

   const useManageNotificationAPI = useMutation({
		mutationFn: async ({ id, notification }: { id: string; notification: NotificationPayload }) => {
			try {
				const res = await apiClient.post(`${API_ADMIN_URL}/manage-notifications/${id}`, notification);
				return res;
			} catch (err) {
				console.log(err);
			}
		},
	});

	return {
        useGetDashboardDataQuery,
        useManageUserAPI,
        useManageNotificationAPI,
		useNewAnnouncementAPI
	};
};
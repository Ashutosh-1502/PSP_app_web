"use client";

import { useAnnouncementAPI } from "@/module/announcement/hooks/useAnnouncement";
import Loader from "@/module/dashboard/components/loader";
import noData from "@public/assets/gif/NoData.json";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Notification } from "@/types";
import { Mic } from "lucide-react";
import { formatDate, formatedTime } from "@/module/dashboard/utils/index";
import AnnouncementDialog from "@/module/dashboard/components/announcementDetails";
import { useProfileAPI } from "@/module/profile/hooks/useProfile";
import { Button } from "@/components/ui/button";

export default function UserAnnouncements() {
	const { useGetAllNotificationQuery, useUserManageNotificationAPI } = useAnnouncementAPI();
	const { useGetUserData } = useProfileAPI();
	const { data: userData } = useGetUserData();

	const { data: notificationsData, isSuccess, refetch: refetchNotificationData } = useGetAllNotificationQuery();
	const notificationTableHeader: string[] = ["S.No", "Title", "Status", "Date", "Time", "Details"];

	const isRead = (notification: Notification): boolean => {
		return notification.notificationSeenStatus.some((data) => data.userRef === userData?._id);
	};

	const markRead = (data: { id: string; userId: string }) => {
		useUserManageNotificationAPI.mutate(
			{ ...data },
			{
				onSuccess: () => {
					void refetchNotificationData();
				},
				onError: () => {
					console.log("failed");
				},
			}
		);
	};

	return (
		<div className="flex flex-col gap-y-8">
			<div className="flex w-[100%] flex-col gap-y-5 rounded-lg bg-gray-100 bg-secondary-foreground px-4 py-6 shadow-md">
				<div className="flex items-center justify-between">
					<h2 className="flex items-center gap-x-3 font-medium text-gray-500">
						<Mic /> Announcement
					</h2>
				</div>

				<div className="max-h-[calc(100vh - 69px)] overflow-y-auto">
					<Table>
						<TableHeader className="sticky top-0 z-10">
							<TableRow className="transition-colors hover:bg-transparent">
								{notificationTableHeader.map((header, index) => (
									<TableHead key={index} className="text-center text-primary-foreground">
										{header}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{notificationsData?.notifications &&
							(notificationsData.notifications.length === 0 || notificationsData.notifications.length === 0) ? (
								<TableRow className=" transition-colors hover:bg-transparent">
									<TableCell colSpan={6} className="py-5 text-center">
										<Loader loader={noData} height={40} width={40} />
									</TableCell>
								</TableRow>
							) : (
								notificationsData?.notifications.map((notification: Notification, index) => (
									<TableRow
										key={notification._id}
										className={`transition-colors ${!isRead(notification) ? "bg-popover-foreground font-bold" : ""}`}
									>
										<TableCell className="text-center">{index + 1}</TableCell>
										<TableCell className="text-center">{notification.title}</TableCell>
										<TableCell className="text-center">
											{/* <div className="flex items-center justify-center gap-2">
												{isRead(notification) ? "Read" : "Unread"}
											</div> */}
											<Button variant="default" size="sm" disabled>
												{isRead(notification) ? "Read" : "Unread"}
											</Button>
										</TableCell>
										<TableCell className="text-center">
											<div className="flex items-center justify-center gap-2">{formatDate(notification.createdAt)}</div>
										</TableCell>
										<TableCell className="text-center">
											<div className="flex items-center justify-center gap-2">
												{formatedTime(notification.createdAt)}
											</div>
										</TableCell>
										<TableCell className="text-center">
											{notification?._id && userData?._id && (
												<span onClick={() => markRead({ id: notification._id!, userId: userData._id })}>
													<AnnouncementDialog notification={notification} />
												</span>
											)}
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>
		</div>
	);
}

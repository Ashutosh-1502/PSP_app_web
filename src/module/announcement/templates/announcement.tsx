"use client";

import { useAnnouncementAPI } from "@/module/announcement/hooks/useAnnouncement";
import Loader from "@/module/dashboard/components/loader";
import noData from "@public/assets/gif/NoData.json";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { type Notification } from "@/types";
import { Mic, Search } from "lucide-react";
import { formatDate, formatedTime } from "@/module/dashboard/utils/index";
import AnnouncementDialog from "@/module/dashboard/components/announcementDetails";
import { useProfileAPI } from "@/module/profile/hooks/useProfile";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useMemo } from "react";
import { getSocket } from "@/lib/utils/socketHelper";

export default function UserAnnouncements() {
	const { useGetAllNotificationQuery, useUserManageNotificationAPI } = useAnnouncementAPI();
	const { useGetUserData } = useProfileAPI();
	const { data: userData } = useGetUserData();

	const { data: notificationsData, isSuccess, refetch: refetchNotificationData } = useGetAllNotificationQuery();

	const notificationTableHeader: string[] = ["S.No", "Title", "Status", "Date", "Time", "Details"];

	const [searchTerm, setSearchTerm] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
	const [itemsPerPage] = useState(10);

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

	useEffect(() => {
		const socket = getSocket();
		socket.on("new-announcement", (data) => {
			console.log("📢 New announcement received:", data);
			void refetchNotificationData();
		});

		return () => {
			socket.off("new-announcement");
		};
	}, [refetchNotificationData]);

	// Search filtering
	const filteredNotifications = useMemo(() => {
		if (!notificationsData?.notifications) return [];
		return notificationsData.notifications.filter((notification: Notification) =>
			notification.title.toLowerCase().includes(searchTerm.toLowerCase())
		);
	}, [notificationsData, searchTerm]);

	// Pagination calculations
	const totalPages = Math.ceil(filteredNotifications.length / itemsPerPage);
	const paginatedNotifications = useMemo(() => {
		const start = (currentPage - 1) * itemsPerPage;
		const end = start + itemsPerPage;
		return filteredNotifications.slice(start, end);
	}, [filteredNotifications, currentPage, itemsPerPage]);

	return (
		<div className="flex flex-col gap-y-8">
			<div className="flex w-[100%] flex-col gap-y-5 rounded-lg bg-gray-100 bg-secondary-foreground px-4 py-6 shadow-md">
				<div className="flex items-center justify-between">
					<h2 className="flex items-center gap-x-3 font-medium text-gray-500">
						<Mic /> Announcement
					</h2>
					<div className="flex items-center gap-x-2">
						<input
							type="text"
							placeholder="Search by title"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
							className="rounded-md border px-2 py-1 placeholder:text-gray-300 text-sm"
						/>
					</div>
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
							{paginatedNotifications.length === 0 ? (
								<TableRow className=" transition-colors hover:bg-transparent">
									<TableCell colSpan={6} className="py-5 text-center">
										<Loader loader={noData} height={40} width={40} />
									</TableCell>
								</TableRow>
							) : (
								paginatedNotifications.map((notification: Notification, index) => (
									<TableRow
										key={notification._id}
										className={`transition-colors ${!isRead(notification) ? "bg-popover-foreground font-bold" : ""}`}
									>
										<TableCell className="text-center">{(currentPage - 1) * itemsPerPage + index + 1}</TableCell>
										<TableCell className="text-center">{notification.title}</TableCell>
										<TableCell className="text-center">
											<Button variant="default" size="sm" disabled>
												{isRead(notification) ? "Read" : "Unread"}
											</Button>
										</TableCell>
										<TableCell className="text-center">{formatDate(notification.createdAt)}</TableCell>
										<TableCell className="text-center">{formatedTime(notification.createdAt)}</TableCell>
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

					{/* Pagination Controls */}
					{totalPages > 1 && (
						<div className="mt-4 flex justify-end gap-2">
							<Button
								variant="outline"
								size="sm"
								disabled={currentPage === 1}
								onClick={() => setCurrentPage((prev) => prev - 1)}
							>
								Prev
							</Button>
							<span className="flex items-center gap-x-1">
								Page {currentPage} of {totalPages}
							</span>
							<Button
								variant="outline"
								size="sm"
								disabled={currentPage === totalPages}
								onClick={() => setCurrentPage((prev) => prev + 1)}
							>
								Next
							</Button>
						</div>
					)}
			</div>
		</div>
	);
}

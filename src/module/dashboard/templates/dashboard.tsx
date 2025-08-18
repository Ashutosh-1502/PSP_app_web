"use client";

import { useDashboardAPI } from "@/module/dashboard/hooks/useDashboard";
import { groupGraphDataByDate } from "@/module/dashboard/utils/index";
import Loader from "@/module/dashboard/components/loader";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, useMemo } from "react";
import loaderAnimation from "@public/assets/gif/dataLoading.json";
import noData from "@public/assets/gif/NoData.json";
import { Button } from "@/components/ui/button";
import BarGraph from "@/module/dashboard/components/barGraph";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { UserDetails } from "@/module/dashboard/types/index";
import { type Notification } from "@/types";
import { ChevronDown, Mic, User, TrendingUp, Search } from "lucide-react";
import NewAnnouncement from "@/module/dashboard/components/newAnnouncement";
import { formatDate, formatedTime } from "@/module/dashboard/utils/index";
import AnnouncementDialog from "@/module/dashboard/components/announcementDetails";
import UserDetailsDialog from "@/module/dashboard/components/userDetailsDialog";
import { Input } from "@/components/ui/input";
import { getSocket } from "@/lib/utils/socketHelper";

export default function AdminDashboard() {
	const { useGetDashboardDataQuery } = useDashboardAPI();
	const [userGrpahFilter, setUserGraphFilter] = useState<string>("Week");
	const [sequenceGrpahFilter, setSequenceGraphFilter] = useState<string>("Week");
	const [userGraphData, setUserGraphData] = useState<{ week?: string; day?: string; total: number }[] | null>([]);
	const [sequenceGraphData, setSequenceGraphData] = useState<{ week?: string; day?: string; total: number }[] | null>(
		[]
	);
	const [users, setUsers] = useState<UserDetails[]>([]);
	const [searchUser, setSearchUser] = useState<string>("");
	const [searchAnnouncement, setSearchAnnouncement] = useState<string>("");

	const [userPage, setUserPage] = useState<number>(1);
	const [announcementPage, setAnnouncementPage] = useState<number>(1);
	const itemsPerPage = 10;

	const { data: dashboardData, isSuccess, refetch: refetchDashboardData } = useGetDashboardDataQuery();

	const userTableHeader: string[] = ["S.No", "Name", "Email", "Status", "Total Sequences", "Details"];
	const notificationTableHeader: string[] = ["S.No", "Title", "User", "Date", "Time", "Details"];

	// Filtered and paginated users
	const filteredUsers = useMemo(() => {
		const filtered = users.filter(
			(u) =>
				`${u.name.first} ${u.name.last}`.toLowerCase().includes(searchUser.toLowerCase()) ||
				u.email.toLowerCase().includes(searchUser.toLowerCase())
		);
		const start = (userPage - 1) * itemsPerPage;
		return filtered.slice(start, start + itemsPerPage);
	}, [users, searchUser, userPage]);

	const filteredAnnouncements = useMemo(() => {
		const allNotifications = dashboardData?.notifications || [];
		const filtered = allNotifications.filter((n) => n.title.toLowerCase().includes(searchAnnouncement.toLowerCase()));
		const start = (announcementPage - 1) * itemsPerPage;
		return filtered.slice(start, start + itemsPerPage);
	}, [dashboardData, searchAnnouncement, announcementPage]);

	useEffect(() => {
		if (dashboardData?.userDetails) {
			if (dashboardData.userDetails.length === 0) {
				setUserGraphData(null);
			} else {
				const groupedData = groupGraphDataByDate(dashboardData.userDetails, userGrpahFilter);
				setUserGraphData(groupedData);
			}
		}
		if (dashboardData?.sequences) {
			if (dashboardData.sequences.length === 0) {
				setSequenceGraphData(null);
			} else {
				const groupedData = groupGraphDataByDate(dashboardData.sequences, sequenceGrpahFilter);
				setSequenceGraphData(groupedData);
			}
		}
	}, [dashboardData, userGrpahFilter, sequenceGrpahFilter, refetchDashboardData]);

	useEffect(() => {
		if (isSuccess && dashboardData) {
			setUsers(dashboardData.userDetails || []);
		}
	}, [isSuccess, dashboardData]);

	useEffect(() => {
		const socket = getSocket();
		socket.on("new-user", (user: UserDetails) => {
			setUsers((prev) => [...prev, user]);
		});
		return () => {
			socket.off("new-user");
		};
	}, []);

	const totalUserPages = Math.ceil(
		users.filter(
			(u) =>
				`${u.name.first} ${u.name.last}`.toLowerCase().includes(searchUser.toLowerCase()) ||
				u.email.toLowerCase().includes(searchUser.toLowerCase())
		).length / itemsPerPage
	);

	const totalAnnouncementPages = Math.ceil(
		(dashboardData?.notifications || []).filter((n) => n.title.toLowerCase().includes(searchAnnouncement.toLowerCase()))
			.length / itemsPerPage
	);

	return (
		<div className="flex flex-col gap-y-8">
			{/* User and Sequence Graphs */}
			<div className="flex justify-between gap-x-8">
				{/* User Graph */}
				<div className="border-color-gray-300 flex w-[100%] flex-col gap-y-8 rounded-lg border-[1px] bg-white px-4 py-6">
					<div className="flex w-full items-center justify-between">
						<h3 className="flex items-center gap-x-3 font-medium text-gray-500">
							<TrendingUp />
							{`User Registered this ${userGrpahFilter}`}
						</h3>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="outline" className="flex items-center gap-2">
									{userGrpahFilter}
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => setUserGraphFilter("Week")}>Week</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setUserGraphFilter("Month")}>Month</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					{userGraphData?.length === 0 ? (
						<Loader loader={loaderAnimation} height={40} width={40} />
					) : userGraphData === null ? (
						<Loader loader={noData} height={40} width={40} />
					) : (
						<div>
							<BarGraph graphData={userGraphData} filter={userGrpahFilter} barColor="#2563eb" />
						</div>
					)}
				</div>

				{/* Sequence Graph */}
				<div className="border-color-gray-300 flex w-[100%] flex-col gap-y-8 rounded-lg border-[1px] bg-white px-4 py-6">
					<div className="flex w-full items-center justify-between">
						<h3 className="flex items-center gap-x-3 font-medium text-gray-500">
							<TrendingUp />
							{`Sequences searches this ${sequenceGrpahFilter}`}
						</h3>
						<DropdownMenu>
							<DropdownMenuTrigger>
								<Button variant="outline" className="flex items-center gap-2">
									{sequenceGrpahFilter}
									<ChevronDown className="h-4 w-4" />
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem onClick={() => setSequenceGraphFilter("Week")}>Week</DropdownMenuItem>
								<DropdownMenuItem onClick={() => setSequenceGraphFilter("Month")}>Month</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</div>
					{sequenceGraphData?.length === 0 ? (
						<Loader loader={loaderAnimation} height={40} width={40} />
					) : sequenceGraphData === null ? (
						<Loader loader={noData} height={40} width={40} />
					) : (
						<div>
							<BarGraph graphData={sequenceGraphData} filter={sequenceGrpahFilter} barColor="#239BA7" />
						</div>
					)}
				</div>
			</div>

			{/* User Table */}
			<div className="border-color-gray-300 flex w-[100%] flex-col gap-y-5 rounded-lg border-[1px] px-4 py-6">
				<div className="flex items-center justify-between">
					<h2 className="flex items-center gap-x-3 font-medium text-gray-500">
						<User /> User Registration Details
					</h2>
					<Input
						placeholder="Search users"
						className="max-w-xs placeholder:text-gray-300"
						value={searchUser}
						onChange={(e) => {
							setSearchUser(e.target.value);
							setUserPage(1);
						}}
					/>
				</div>

				<div className="max-h-[600px] overflow-y-auto">
					<Table>
						<TableHeader className="sticky top-0 z-10">
							<TableRow className="transition-colors hover:bg-transparent">
								{userTableHeader.map((header, index) => (
									<TableHead key={index} className="text-center text-primary-foreground">
										{header}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{filteredUsers.length === 0 ? (
								<TableRow className="transition-colors hover:bg-transparent">
									<TableCell colSpan={6} className="py-5 text-center">
										<Loader loader={noData} height={40} width={40} />
									</TableCell>
								</TableRow>
							) : (
								filteredUsers.map((user: UserDetails, index) => (
									<TableRow key={user._id} className="transition-colors hover:bg-primary-foreground hover:text-primary">
										<TableCell className="text-center">{(userPage - 1) * itemsPerPage + index + 1}</TableCell>
										<TableCell className="text-center">{`${user.name.first} ${user.name.last}`}</TableCell>
										<TableCell className="text-center">{user.email}</TableCell>
										<TableCell className="text-center">
											<div className="flex items-center justify-center gap-2">
												<span
													className={`h-3 w-3 rounded-full ${user.status === "UNBLOCKED" ? "bg-green-500" : "bg-red-500"}`}
												></span>
												{user.status.charAt(0).toUpperCase() + user.status.slice(1).toLowerCase()}
											</div>
										</TableCell>
										<TableCell className="text-center">{user.sequences.length}</TableCell>
										<TableCell className="text-center">
											<UserDetailsDialog refetchDashboardData={() => void refetchDashboardData()} user={user} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>

				{/* User Pagination */}
				{users.length > 10 && (
					<div className="flex justify-end gap-x-2 py-2">
						<Button variant="outline" disabled={userPage === 1} onClick={() => setUserPage((prev) => prev - 1)}>
							Prev
						</Button>
						<span className="flex items-center px-2">
							{userPage} / {totalUserPages}
						</span>
						<Button
							variant="outline"
							disabled={userPage === totalUserPages}
							onClick={() => setUserPage((prev) => prev + 1)}
						>
							Next
						</Button>
					</div>
				)}
			</div>

			{/* Announcements Table */}
			<div className="border-color-gray-300 flex w-[100%] flex-col gap-y-5 rounded-lg border-[1px] px-4 py-6">
				<div className="flex items-center justify-between">
					<h2 className="flex items-center gap-x-3 font-medium text-gray-500">
						<Mic /> Announcement
					</h2>
					<div className="flex w-[50%] items-center gap-x-3">
						<NewAnnouncement refetchDashboardData={() => void refetchDashboardData()} />
						<Input
							placeholder="Search announcements"
							className="placeholder:text-gray-300"
							value={searchAnnouncement}
							onChange={(e) => {
								setSearchAnnouncement(e.target.value);
								setAnnouncementPage(1);
							}}
						/>
					</div>
				</div>

				<div className="max-h-[600px] overflow-y-auto">
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
							{filteredAnnouncements.length === 0 ? (
								<TableRow className=" transition-colors hover:bg-transparent">
									<TableCell colSpan={7} className="py-5 text-center">
										<Loader loader={noData} height={40} width={40} />
									</TableCell>
								</TableRow>
							) : (
								filteredAnnouncements.map((notification: Notification, index) => (
									<TableRow
										key={notification._id}
										className="transition-colors hover:bg-primary-foreground hover:text-primary"
									>
										<TableCell className="text-center">{(announcementPage - 1) * itemsPerPage + index + 1}</TableCell>
										<TableCell className="text-center">{notification.title}</TableCell>
										<TableCell className="text-center">{"All"}</TableCell>
										<TableCell className="text-center">{formatDate(notification.createdAt)}</TableCell>
										<TableCell className="text-center">{formatedTime(notification.createdAt)}</TableCell>
										<TableCell className="text-center">
											<AnnouncementDialog notification={notification} />
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>

				{/* Announcement Pagination */}
				{(dashboardData?.notifications?.length || 0) > 10 && (
					<div className="flex justify-end gap-x-2 py-2">
						<Button
							variant="outline"
							disabled={announcementPage === 1}
							onClick={() => setAnnouncementPage((prev) => prev - 1)}
						>
							Prev
						</Button>
						<span className="flex items-center px-2">
							{announcementPage} / {totalAnnouncementPages}
						</span>
						<Button
							variant="outline"
							disabled={announcementPage === totalAnnouncementPages}
							onClick={() => setAnnouncementPage((prev) => prev + 1)}
						>
							Next
						</Button>
					</div>
				)}
			</div>
		</div>
	);
}

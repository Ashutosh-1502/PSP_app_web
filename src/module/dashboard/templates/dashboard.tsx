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
import { useState, useEffect } from "react";
import loaderAnimation from "@public/assets/gif/dataLoading.json";
import noData from "@public/assets/gif/NoData.json";
import { Button } from "@/components/ui/button";
import BarGraph from "@/module/dashboard/components/barGraph";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { UserDetails } from "@/module/dashboard/types/index";
import { type Notification } from "@/types";
import { ChevronDown, Mic, User, TrendingUp } from "lucide-react";
import NewAnnouncement from "@/module/dashboard/components/newAnnouncement";
import { formatDate, formatedTime } from "@/module/dashboard/utils/index";
import AnnouncementDialog from "@/module/dashboard/components/announcementDetails";
import UserDetailsDialog from "@/module/dashboard/components/userDetailsDialog";

export default function AdminDashboard() {
	const { useGetDashboardDataQuery } = useDashboardAPI();
	const [userGrpahFilter, setUserGraphFilter] = useState<string>("Week");
	const [sequenceGrpahFilter, setSequenceGraphFilter] = useState<string>("Week");
	const [userGraphData, setUserGraphData] = useState<{ week?: string; day?: string; total: number }[] | null>([]);
	const [sequenceGraphData, setSequenceGraphData] = useState<{ week?: string; day?: string; total: number }[] | null>(
		[]
	);

	const { data: dashboardData, isSuccess, refetch: refetchDashboardData } = useGetDashboardDataQuery();

	const userTableHeader: string[] = ["S.No", "Name", "Email", "Status", "Total Sequences", "Details"];
	const notificationTableHeader: string[] = ["S.No", "Title", "User", "Status", "Date", "Time", "Details"];

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

	return (
		<div className="flex flex-col gap-y-8">
			<div className="flex justify-between gap-x-8">
				<div className="flex w-[100%] flex-col gap-y-8 rounded-lg border-[1px] border-color-gray-300 px-4 py-6 bg-white">
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
				<div className="flex w-[100%] flex-col gap-y-8 rounded-lg border-[1px] border-color-gray-300 px-4 py-6 bg-white">
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

			<div className="flex w-[100%] flex-col gap-y-5 rounded-lg border-[1px] border-color-gray-300 px-4 py-6">
				<div className="">
					<h2 className="flex items-center gap-x-3 font-medium text-gray-500">
						<User /> User Registration Details
					</h2>
				</div>
				{/* <div className="pt-2">
					<SearchBox variant="outline" value={""} onChange={() => console.log("")} placeholder="Search for the user" />
				</div> */}

				<div className="max-h-[500px] overflow-y-auto">
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
							{dashboardData?.userDetails && dashboardData.userDetails.length === 0 ? (
								<TableRow className=" transition-colors hover:bg-transparent">
									<TableCell colSpan={6} className="py-5 text-center">
										<Loader loader={noData} height={40} width={40} />
									</TableCell>
								</TableRow>
							) : (
								dashboardData?.userDetails.map((user: UserDetails, index) => (
									<TableRow key={user._id} className="transition-colors hover:bg-primary-foreground hover:text-primary">
										<TableCell className="text-center">{index + 1}</TableCell>
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
											<UserDetailsDialog refetchDashboardData={() => void refetchDashboardData()} user={user}/>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>
			</div>

			<div className="flex w-[100%] flex-col gap-y-5 rounded-lg border-[1px] border-color-gray-300 px-4 py-6">
				<div className="flex items-center justify-between">
					<h2 className="flex items-center gap-x-3 font-medium text-gray-500">
						<Mic /> Announcement
					</h2>
					<div className="flex items-center gap-x-3">
						<NewAnnouncement refetchDashboardData={() => void refetchDashboardData()} />
					</div>
				</div>

				<div className="max-h-[500px] overflow-y-auto">
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
							{dashboardData?.notifications && (dashboardData.notifications.length === 0 || dashboardData.notifications.length === 0) ? (
								<TableRow className=" transition-colors hover:bg-transparent">
									<TableCell colSpan={6} className="py-5 text-center">
										<Loader loader={noData} height={40} width={40} />
									</TableCell>
								</TableRow>
							) : (
								dashboardData?.notifications.map((notification: Notification, index) => (
									<TableRow
										key={notification._id}
										className="transition-colors hover:bg-primary-foreground hover:text-primary"
									>
										<TableCell className="text-center">{index + 1}</TableCell>
										<TableCell className="text-center">{notification.title}</TableCell>
										<TableCell className="text-center">
											{"All"}
										</TableCell>
										<TableCell className="text-center">
											<div className="flex items-center justify-center gap-2">
												{notification.notificationStatus.charAt(0).toUpperCase() +
													notification.notificationStatus.slice(1).toLowerCase()}
											</div>
										</TableCell>
										<TableCell className="text-center">
											<div className="flex items-center justify-center gap-2">
												{formatDate(notification.createdAt)}
											</div>
										</TableCell>
										<TableCell className="text-center">
											<div className="flex items-center justify-center gap-2">
												{formatedTime(notification.createdAt)}
											</div>
										</TableCell>
										<TableCell className="text-center">
											<AnnouncementDialog notification={notification}/>
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

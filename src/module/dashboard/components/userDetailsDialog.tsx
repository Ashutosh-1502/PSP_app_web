import {
	Dialog,
	DialogTrigger,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
	DialogFooter,
	DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Separator } from "@/components/ui/separator";
import { Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { useDashboardAPI } from "@/module/dashboard/hooks/useDashboard";
import { UserDetails } from "@/module/dashboard/types/index";
import { formatedTime, formatDate } from "@/module/dashboard/utils/index";
import toast from "react-hot-toast";
import { STATUS } from "@/types";
import Loader from "@/module/dashboard/components/loader";
import noData from "@public/assets/gif/NoData.json";

const sequenceData = [
	{
		id: 1,
		sequence: "AGCTTACGTA",
		percentage: "98%",
		searchedAt: new Date("2025-08-06T19:00:00"),
	},
	{
		id: 2,
		sequence: "CGTAACTGGA",
		percentage: "92%",
		searchedAt: new Date("2025-08-06T19:30:00"),
	},
];

export default function UserDetailsDialog({
	refetchDashboardData,
	user,
}: {
	refetchDashboardData: () => void;
	user: UserDetails;
}) {
	const tableHeader: string[] = ["S.No", "Matched Sequences", "Match %", "Date", "Time", "Action"];
	const [isUserUnblock, setIsUserUnblock] = useState(true);
	const { useManageUserAPI } = useDashboardAPI();

	const blockUnblockUser = (data: { id: string; operation: STATUS }) => {
		useManageUserAPI.mutate(
			{ ...data },
			{
				onSuccess: () => {
					toast.success(
						`${user.name.first} ${user.name.last} has been ${user.status === STATUS.BLOCKED ? "Unblocked" : "Blocked"}`,
						{
							duration: 2000,
						}
					);
					refetchDashboardData();
				},
				onError: () => {
					toast.error(`Operation Faild due to technical issue. Please try after some time`, {
						duration: 2000,
					});
				},
			}
		);
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" className="hover:bg-primary-foreground hover:text-primary">
					Show Details
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-4xl">
				<DialogHeader>
					<DialogTitle>
						<div className="flex items-center gap-x-2 text-primary-foreground">
							User Details
							<Badge variant="default" className="rounded-full px-3 py-1 bg-green-200 text-black">
								{`Last Active ${formatDate(user.lastActivity)} at ${formatedTime(user.lastActivity)}`}
							</Badge>
						</div>
					</DialogTitle>
					<DialogDescription className="text-muted">
						Account created on {formatDate(user.createdAt)} at {formatedTime(user.createdAt)}
					</DialogDescription>
				</DialogHeader>

				<Separator className="my-2" />

				{/* User Info Section */}
				<div className="mb-6 flex items-center justify-between">
					<div className="mb-6 flex items-center space-x-4">
						<img
							src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
							alt="Profile"
							className="h-16 w-16 rounded-full border"
						/>
						<div>
							<div className="items-center- flex gap-x-2">
								<h2 className="text-lg font-semibold text-primary-foreground">{`${user.name.first} ${user.name.last}`}</h2>
								<Badge variant={isUserUnblock ? "default" : "destructive"} className="rounded-full px-3 py-1 text-sm">
									{user.status === STATUS.BLOCKED ? "Block" : "Unblock"}
								</Badge>
							</div>
							<p className="text-sm text-muted">{user.email}</p>
						</div>
					</div>
					<div className="flex items-center space-x-3">
						<Button
							size="sm"
							variant="outline"
							className="text-xs"
							onClick={() =>
								blockUnblockUser({
									id: user._id,
									operation: user.status === STATUS.UNBLOCKED ? STATUS.BLOCKED : STATUS.UNBLOCKED,
								})
							}
						>
							{user.status === STATUS.BLOCKED ? "Unblock" : "Block"}
						</Button>
					</div>
				</div>

				{/* Sequence Search Table */}
				<div className="max-h-[500px] overflow-y-auto rounded-lg border">
					<Table>
						<TableHeader className="sticky top-0 z-10">
							<TableRow className="transition-colors hover:bg-transparent">
								{tableHeader.map((header, index) => (
									<TableHead key={index} className="text-center text-primary-foreground">
										{header}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>
						<TableBody>
							{sequenceData.length !== 0 ? (
								<TableRow className=" transition-colors hover:bg-transparent">
									<TableCell colSpan={6} className="py-5 text-center">
										<Loader loader={noData} height={10} width={10} />
									</TableCell>
								</TableRow>
							) : (
								sequenceData.map((item, index) => (
									<TableRow key={item.id} className="transition-colors hover:bg-popover-foreground">
										<TableCell className="text-center font-medium">{index + 1}</TableCell>
										<TableCell className="max-w-[10px] truncate text-center">{item.sequence}</TableCell>
										<TableCell className="text-center">{item.percentage}</TableCell>
										<TableCell className="text-center">{"12 Augest 2026"}</TableCell>
										<TableCell className="text-center">{"12:00 PM"}</TableCell>
										<TableCell className="space-x-2 text-center">
											<Button variant="outline" size="icon">
												<Download className="h-4 w-4" />
											</Button>
											<Button variant="outline" size="icon">
												<Eye className="h-4 w-4" />
											</Button>
										</TableCell>
									</TableRow>
								))
							)}
						</TableBody>
					</Table>
				</div>

				<DialogFooter className="mt-6">
					<DialogClose asChild>
						<Button variant="secondary">Close</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

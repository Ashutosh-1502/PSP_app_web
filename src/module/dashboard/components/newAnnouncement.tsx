"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from "@/components/ui/drawer";
import { defaultValues, announcementFormSchema, type AnnouncementFormType } from "@/module/dashboard/utils/form-utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { FaInfoCircle } from "react-icons/fa";
import { useForm, Controller, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import "react-quill/dist/quill.snow.css";
import { useDashboardAPI } from "@/module/dashboard/hooks/useDashboard";
import toast from "react-hot-toast";
import { NOTIFICATION } from "@/types";
import type { NotificationPayload } from "@/module/dashboard/types/index";
import { useLoader } from "@/components/common/loader/loaderContext";
import sendLoader from "@public/assets/gif/send.json";
import Lottie from "lottie-react";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function NewAnnouncement({ refetchDashboardData }: { refetchDashboardData: () => void }) {
	const { showLoader, hideLoader } = useLoader();
	const { useNewAnnouncementAPI } = useDashboardAPI();
	const {
		register,
		handleSubmit,
		control,
		reset,
		formState: { errors },
	} = useForm<AnnouncementFormType>({
		defaultValues: defaultValues(),
		resolver: zodResolver(announcementFormSchema),
	});

	const postAnnouncement = (data: NotificationPayload) => {
		showLoader(<Lottie animationData={sendLoader} loop autoplay />);
		setTimeout(() => {
			useNewAnnouncementAPI.mutate(
				{ ...data },
				{
					onSuccess: () => {
						toast.success(`You successfullly made an Announcement`, {
							duration: 2000,
						});
						reset();
						refetchDashboardData();
					},
					onError: () => {
						hideLoader();
						toast.error(`Operation Faild due to technical issue. Please try after some time`, {
							duration: 2000,
						});
					},
				}
			);
			hideLoader();
		}, 4000);
	};

	const onSubmit: SubmitHandler<AnnouncementFormType> = (data: AnnouncementFormType) => {
		const finalData = {
			...data,
			operation: NOTIFICATION.SEND,
		};
		postAnnouncement(finalData);
	};

	return (
		<Drawer>
			<DrawerTrigger asChild>
				<Button variant="outline">
					<Plus /> New Announcement
				</Button>
			</DrawerTrigger>

			<DrawerContent>
				<div className="mx-auto w-full max-w-2xl px-4 py-6">
					<DrawerHeader className="w-full p-0">
						<DrawerTitle className="w-full">
							<h1 className="w-full text-primary-foreground">Create Announcement</h1>
						</DrawerTitle>
						<DrawerDescription className="w-full pb-2">
							<p className="text-primary-foreground">Fill in the details below and submit your announcement.</p>
						</DrawerDescription>
					</DrawerHeader>

					<form onSubmit={(event) => void handleSubmit(onSubmit)(event)} className="space-y-4 py-4">
						{/* Title */}
						<div className="relative flex flex-col space-y-2">
							<Label className="text-sm text-gray-500">Announcement title</Label>
							<Input
								type="text"
								{...register("title")}
								className={
									"placeholder:text-primar-foreground placeholder:font-medium placeholder:opacity-50" +
									(errors.title ? "border-destructive-foreground" : "")
								}
								placeholder="Enter Title"
							/>
							{errors.title && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<span className="text-md  text-red absolute right-2 top-10 -translate-y-1/2">
												<FaInfoCircle className="text-destructive-foreground" />
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>{errors.title.message}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						</div>

						{/* Subject */}
						<div className="relative flex flex-col space-y-2">
							<Label className="text-sm text-gray-500">Subject</Label>
							<Input
								type="text"
								{...register("subject")}
								className={
									"placeholder:text-primar-foreground placeholder:font-medium placeholder:opacity-50" +
									(errors.subject ? "border-destructive-foreground" : "")
								}
								placeholder="Enter Subject"
							/>
							{errors.subject && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<span className="text-md  text-red absolute right-2 top-10 -translate-y-1/2">
												<FaInfoCircle className="text-destructive-foreground" />
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>{errors.subject.message}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						</div>

						{/* Announcement */}
						<div className="relative flex flex-col space-y-2">
							<Label className="text-sm text-gray-500" htmlFor="announcement">
								Announcement
							</Label>
							<Controller
								name="notificationBody"
								control={control}
								defaultValue=""
								rules={{ required: "Announcement is required" }}
								render={({ field }) => (
									<ReactQuill
										theme="snow"
										value={field.value}
										onChange={field.onChange}
										placeholder="Write your announcement here..."
										className="h-60"
									/>
								)}
							/>

							{errors.notificationBody && (
								<TooltipProvider>
									<Tooltip>
										<TooltipTrigger asChild>
											<span className="text-md  text-red absolute right-2 top-10 -translate-y-1/2">
												<FaInfoCircle className="text-destructive-foreground" />
											</span>
										</TooltipTrigger>
										<TooltipContent>
											<p>{errors.notificationBody.message}</p>
										</TooltipContent>
									</Tooltip>
								</TooltipProvider>
							)}
						</div>

						{/* Footer */}
						<DrawerFooter className="w-full p-0 pt-10">
							<Button variant="outline" type="submit">
								Submit
							</Button>
							<DrawerClose asChild>
								<Button type="button" variant="outline" className="hover:bg-gray-400">
									Cancel
								</Button>
							</DrawerClose>
						</DrawerFooter>
					</form>
				</div>
			</DrawerContent>
		</Drawer>
	);
}

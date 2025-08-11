import { z } from "zod";

export function defaultValues(announcement?: AnnouncementFormType) {
	return {
		title: announcement?.title ?? "",
		subject: announcement?.subject ?? "",
		notificationBody: announcement?.notificationBody ?? "",
	};
}

export const announcementFormSchema = z.object({
	_id: z.string().optional(),
	title: z.string().min(1, { message: "Title is required" }),
	subject: z.string().min(1, { message: "This field is required" }),
	notificationBody: z.string().min(1, { message: "This field is required" }),
});

export type AnnouncementFormType = z.infer<typeof announcementFormSchema>;
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Notification } from "@/types";
import { formatedTime, formatDate } from "@/module/dashboard/utils/index";
import { Separator } from "@/components/ui/separator";

export default function AnnouncementDialog({ notification }: { notification: Notification }) {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button size="sm" className="hover:bg-primary-foreground hover:text-primary">
					View Announcement
				</Button>
			</DialogTrigger>
			<DialogContent className="rounded-2xl shadow-lg sm:max-w-2xl">
				<DialogHeader>
					<DialogTitle className="text-2xl font-bold text-primary-foreground">{notification.title}</DialogTitle>
					<DialogDescription className="mt-1 text-sm text-muted">
						Delivered on {formatDate(notification.createdAt)} at {formatedTime(notification.createdAt)}
					</DialogDescription>
				</DialogHeader>

				<Separator className="my-2" />

				<div className="space-y-6">
					<div>
						<h3 className="mb-1 text-lg font-semibold text-muted">Subject</h3>
						<p className="text-base">{notification.subject}</p>
					</div>

					<div>
						<h3 className="mb-2 text-lg font-semibold text-muted">Announcement</h3>
						<div className="rounded-xl border border-muted-foreground bg-muted/10 px-5 py-4 shadow-inner">
							<div
								className="prose prose-sm sm:prose-base max-w-none text-primary-foreground"
								dangerouslySetInnerHTML={{ __html: notification.notificationBody || "" }}
							/>
						</div>
					</div>
				</div>

				<DialogFooter className="mt-6">
					<DialogClose asChild>
						<Button variant="secondary" className="rounded-full px-6">
							Close
						</Button>
					</DialogClose>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}

"use client";

import { Dialog, DialogContent, DialogOverlay } from "@/components/ui/dialog";
import SidebarMenu from "@/module/profile/components/sidebar-menu";
import type { Props } from "@/module/profile/types";
import { type USER_TYPE } from "@/types";
import Cookies from "js-cookie";
import { Suspense } from "react";
import { COOKIES } from "@/types";
import { cn } from "@/lib/utils";

export default function MobileMenuDrawer({ isOpen, handleClose }: Props) {
	const userType = Cookies.get(COOKIES.USER_TYPE) as USER_TYPE;

	return (
		<Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
			<DialogOverlay className="fixed inset-0 z-50 bg-black/50" />
			<DialogContent
				className={cn(
					"fixed left-0 top-1/2 z-50 h-screen w-[280px] rounded-none border-none bg-white p-4 shadow-lg transition-transform duration-300",
					isOpen ? "translate-x-0" : "-translate-x-full"
				)}
			>
				<Suspense>
					<SidebarMenu role={userType} className="!w-full" />
				</Suspense>
			</DialogContent>
		</Dialog>
	);
}

"use client";

import CheckActiveStatus from "@/lib/utils/check-active-user";
import SidebarMenu from "@/module/profile/components/sidebar-menu";
import { COOKIES, type USER_TYPE } from "@/types/index";
import Header from "@/module/profile/components/header";
import Cookies from "js-cookie";
import { Suspense } from "react";

export default function Layout({ children }: ChildProps) {
	const userType = Cookies.get(COOKIES.USER_TYPE) as USER_TYPE;
	return (
		<>
			<main className="flex min-h-screen flex-grow">
				<CheckActiveStatus />
				<Suspense>
					<SidebarMenu role={userType} className="fixed hidden dark:bg-gray-50 xl:block" />
				</Suspense>
				<div className="flex justify-center w-full flex-col xl:ms-[290px] xl:w-[calc(100%-290px)] 2xl:ms-72 2xl:w-[calc(100%-300px)]">
					<div className="flex flex-grow flex-col px-8 pb-6 pt-2 @container md:px-5 lg:px-6 lg:pb-8 3xl:px-12 3xl:pt-4 4xl:px-14 4xl:pb-9">
						<Header title="Welcome"/>
						{children}
					</div>
				</div>
			</main>
		</>
	);
}

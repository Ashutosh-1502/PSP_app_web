"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useProfileAPI } from "@/module/profile/hooks/useProfile";
import { redirectUser } from "@/module/auth/utils/helpers";

export default function IndexPage() {
	const router = useRouter();
	const { useGetUserData } = useProfileAPI();
	const { data: userData } = useGetUserData();
	console.log(userData?.roles);
	useEffect(() => {
		const redirectTimer = setTimeout(() => {
			const redirectRoute = redirectUser(userData?.roles as string);
			router.push(redirectRoute);
		}, 500);

		return () => clearTimeout(redirectTimer);
	}, [userData, router]);
	return <></>;
}

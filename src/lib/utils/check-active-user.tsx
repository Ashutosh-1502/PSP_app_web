"use client";

import { routes } from "@/config/routes";
import { clearCookies } from "@/module/auth/utils/helpers";
import { useProfileAPI } from "@/module/profile/hooks/useProfile";
import { COOKIES, ROLES, STATUS, type USER_TYPE } from "@/types";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function CheckActiveStatus() {
	const { useGetUserData } = useProfileAPI();
	const { data: userData, isError, isLoading, isSuccess } = useGetUserData();
	const router = useRouter();

	// useEffect(() => {
	// 	if (isError || isLoading) {
	// 		return;
	// 	}

	// 	const userIsActive = userData?.status === STATUS.ACTIVE;
	// 	const userType = Cookies.get(COOKIES.USER_TYPE) as USER_TYPE;
	// 	// we need to  check company status for admin and user (Super Admin doesn't belong to any company )
	// 	const companyIsActive = userData?.companyRef?.companyStatus === STATUS.ACTIVE;
	// 	if (isSuccess && ((userType !== ROLES.SUPER_ADMIN && !companyIsActive) || !userIsActive || !userData)) {
	// 		console.log("check active user is called")
	// 		clearCookies();
	// 		router.push(routes.signIn);
	// 	} else {
	// 		return;
	// 	}
	// }, [userData, isLoading, isError, router, isSuccess]);

	return null;
}

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { COOKIES, ROLES } from "@/types";
import { routes } from "@/config/routes";

interface Permissions {
	[endpoint: string]: string[];
}

const permissions: Permissions = {
	dashboard: [ROLES.SUPER_ADMIN],
};

function checkAuthorization(request: NextRequest, requiredRoles: string[]): boolean {
	const userType = request.cookies.get(COOKIES.USER_TYPE)?.value || "";
	return requiredRoles.includes(userType);
}

export function middleware(request: NextRequest) {
	const path = request.nextUrl.pathname;
	const publicPaths = ["/signin", "/signup", "/forgot-password", "/system/signin"];
	const isPublicPath = publicPaths.includes(path);
	const token = request.cookies.get(COOKIES.TOKEN)?.value || "";
	const userType = request.cookies.get(COOKIES.USER_TYPE)?.value || "";

	const Redirect = () => {
		if (token) {
			switch (userType) {
				case ROLES.ADMIN:
					return NextResponse.redirect(new URL(routes.admin.dashboard, request.url));
				case ROLES.USER:
					return NextResponse.redirect(new URL(routes.proteinSearch, request.url));
			}
		}
		return NextResponse.redirect(new URL(routes.signIn, request.url));
	};

	if (token && isPublicPath) {
		// If trying to access public paths with a token, redirect to dashboard
		return Redirect();
	}

	if (!token && !isPublicPath) {
		// If trying to access private paths without a token, redirect to signin
		return Redirect();
	}

	if (
		// Redirect users to their designated dashboards if they attempt to access unauthorized routes.
		(token && path.startsWith("/admin") && userType === ROLES.USER)
	) {
		return Redirect();
	}

	// Default behavior: allow the request to proceed
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/signin",
		"/signup",
		"/",
		"/admin/:path*",
		"/user/:path*",
		"/profile/products/:path*",
		"/profile/teams",
	],
};

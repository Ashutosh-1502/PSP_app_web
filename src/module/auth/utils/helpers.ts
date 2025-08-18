import { COOKIES, ROLES } from "@/types";
import type { CookiesDataType } from "@/module/auth/types";
import Cookies from "js-cookie";
import { routes } from "@/config/routes";

export const isPasswordValid = (password: string): boolean => {
	const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
	return passwordRegex.test(password);
};

export function redirectUser(userType: string) {
	switch (userType) {
		case ROLES.ADMIN:
			return routes.admin.dashboard;
		case ROLES.USER:
			return routes.proteinViewer;
		default:
			return routes.signIn;
	}
}

// --------------
// cookie helpers
// --------------
export function setCookies(data: CookiesDataType) {
	Cookies.set(COOKIES.USER_TYPE, data.user.roles, { expires: 1 });
	if (data.token) Cookies.set(COOKIES.TOKEN, data.token, { expires: 1 });
}

export function clearCookies() {
	Cookies.remove(COOKIES.TOKEN);
	Cookies.remove(COOKIES.USER_TYPE);
}

export function getCookies() {
	const token = Cookies.get(COOKIES.TOKEN);
	const userType = Cookies.get(COOKIES.USER_TYPE);
	return { userType, token };
}

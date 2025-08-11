import { ROLES } from "@/types";

export function accessCheck(userType: string) {
	return userType !== ROLES.USER;
}

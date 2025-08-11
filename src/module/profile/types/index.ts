import type { USER_TYPE } from "@/types";
import type { UserDetails } from "@/module/dashboard/types";
import * as z from "zod";

export type ChangePasswordApiResponseType = {
	status: number;
};

export type ChangePasswordDataType = {
	currentPassword: string;
	newPassword: string;
	confirmedPassword: string;
};

export type GetUserDataResponseType = {
	success: boolean;
	message: string;
	data: UserDetails;
	error: object;
};

export type UserDataType = {
	_id: string;
	email: string;
	fullName: string;
	name: {
		first: string;
		last: string;
	};
	roles: string;
	status: string;
	profileImage?: string;
	oauth?: string;
	subscriptionCancellationRequested?: boolean;
	companyRef: {
		_id: string;
		companyStatus?: string;
	};
	stripeCustomerId?: string;
};

export type NotificationItemType = {
	_id: string;
	message: string;
};

export type NotificationApiResponseType = {
	success: boolean;
	message: string;
	data: NotificationItemType[];
};

export type UpdatedProfileDataType = {
	name: {
		first: string;
		last: string;
	};
	first_name: string;
	last_name: string;
};

export type UpdateApiResponseType = {
	data: {
		token: string;
	};
};

export interface Props {
	isOpen: boolean;
	placement?: "left" | "right" | "top" | "bottom";
	size?: "DEFAULT" | "sm" | "lg" | "xl" | "full";
	handleClose: () => void;
}

export interface MenuItem {
	href: string;
	name: string;
	Icon: React.ReactNode;
}

export interface SidebarMenuProps extends React.ComponentPropsWithoutRef<"aside"> {
	role: USER_TYPE;
	className?: string;
}

export interface LinksProps extends React.ComponentPropsWithoutRef<"a"> {
	menuItem: MenuItem;
}

export const cardFormSchema = z.object({
	cardHolder: z.string().min(1, { message: "Card holder name is required" }),
	cardNumber: z.string().min(10, { message: "Card Number is required" }),
	expiryDate: z.string().optional(),
	cvc: z.string().optional(),
});
export type CardFormTypes = z.infer<typeof cardFormSchema>;

// form zod validation schema
export const passwordFormSchema = z.object({
	currentPassword: z.string().min(8, { message: "Current password is required" }),
	newPassword: z.string().min(8, { message: "New password required" }),
	confirmedPassword: z.string().min(8, { message: "Confirmed password required" }),
});

// generate form types from zod validation schema
export type PasswordFormTypes = z.infer<typeof passwordFormSchema>;

// form zod validation schema
export const personalInfoFormSchema = z.object({
	first_name: z.string().min(1, { message: "First name is required" }),
	last_name: z.string().min(1, { message: "Last name is required" }),
	// userRole: z.string().min(1, { message: "Role is required" }),
	// country: z.string().min(1, { message: "Country is required" }),
	// timezone: z.string().min(1, { message: "Timezone is required" }),
	// description: z.string().optional(),
});

export type PersonalInfoFormTypes = z.infer<typeof personalInfoFormSchema>;

export interface File {
	type: string;
	name: string;
}

export const profileFormSchema = z.object({
	first_name: z.string().min(1, { message: "Fist name is required" }),
	website: z.string().optional(),
	email: z.string().min(1, { message: "Email is required" }),
	role: z.string({ required_error: "Role is required" }),
	description: z.string().optional(),
});

export type ProfileFormTypes = z.infer<typeof profileFormSchema>;

export type UpdateProfileByIdType = {
	id: string;
	companyRef: string;
	update: {
		name?: {
			first: string;
			last: string;
		};
	};
};

export type UpdateProfileByIdApiResponseType = {
	success: boolean;
	message: string;
};

export type ChangePasswordByIdType = {
	id: string;
	data: {
		currentPassword: string;
		newPassword: string;
		confirmedPassword: string;
	};
};

export type ChangePasswordByIdApiResponseType = {
	success: boolean;
	message: string;
};

import type { ROLES, STATUS } from "@/types";
import type { Notification, Sequence, NOTIFICATION } from "@/types";

export enum ACTION {
	ACTIVE = "ACTIVE",
	INACTIVE = "INACTIVE",
	BLOCKED = "BLOCKED",
	UNBLOCKED = "UNBLOCKED",
	DELETED = "DELETED",
}

export type GetAllDashboardResponseType = {
	success: boolean;
	message: string;
	data: DashboardResponseType;
	error: object;
};

export type GetAllNotificationType = {
	success: boolean;
	message: string;
	data: {
		notifications: Notification[]
	};
	error: object;
}

export type UserDetails = {
	_id: string;
	name: {
		first: string;
		last: string;
	};
    email: string;
	status: STATUS;
	roles: ROLES;
	notification: string[];
	sequences: Sequence[];
    createdAt: string;
	lastActivity: string
};

export type DashboardResponseType = {
	userDetails: UserDetails[];
	notifications: Notification[];
	sequences: Sequence[];
};

export interface NotificationPayload {
	title?: string;
	subject?: string;
	notificationBody?: string;
	operation: NOTIFICATION;
}

export type BarGraphType = {
    graphData: Array<object>,
    filter: string;
    setFilter?: React.Dispatch<React.SetStateAction<string>>;
    barColor: string
}
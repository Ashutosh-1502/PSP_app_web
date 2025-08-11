export type UserLoginDataType = {
	email: string;
	password: string;
};

export type LoginResponseType = {
	status: number;
	message: string;
	data: {
		token: string;
		user: {
			roles: string;
			companyRef: string;
		};
	};
};

export type LogoutResponseType = {
	status: number;
	message: string;
	data: object;
	error: object;
};

export type UserRegisterDataType = {
	name: {
		first: string;
		last: string;
	};
	email: string;
	password: string;
	confirmPassword: string;
	roles?: string;
	token?: string;
};

export type RegisterResponseType = {
	status: number;
};

export type CookiesDataType = {
	user: {
		roles: string;
		companyRef?: string;
	};
	token?: string;
};

export type UserMetadataType = {
	full_name: string;
};

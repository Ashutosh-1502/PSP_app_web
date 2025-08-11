"use client";

import { routes } from "@/config/routes";
import Link from "next/link";
import { PiArrowRightBold } from "react-icons/pi";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import type { AxiosError } from "axios";
import type { NSignUpApiResponseType } from "@/types";
import { useAuthAPI } from "@/module/auth/hooks/useAuth";
import { isPasswordValid, setCookies, getCookies } from "@/module/auth/utils/helpers";
import { redirectUser } from "@/module/auth/utils/helpers";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { useLoader } from "@/components/common/loader/loaderContext";

export default function SignUpForm() {
	const router = useRouter();
	const { useRegisterMutation } = useAuthAPI();
	const searchParams = useSearchParams();
	const token = searchParams.get("inviteToken");
	const { showLoader, hideLoader } = useLoader();
	const [userData, setUserData] = useState({
		name: {
			first: "",
			last: "",
		},
		email: "",
		password: "",
		confirmPassword: "",
	});
	const [showPassword, setShowPassword] = useState(false);

	const handlePasswordVisibility = () => setShowPassword(!showPassword);
	const [isCheckboxChecked, setIsCheckboxChecked] = useState(false);

	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const handleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);
	const [, setIsTokenExpiredError] = useState(false);

	const isButtonDisabled =
		!userData.name.first || !userData.name.last || !Object.values(userData).every(Boolean);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name === "first" || name === "last") {
			setUserData({
				...userData,
				name: {
					...userData.name,
					[name]: value,
				},
			});
		} else {
			setUserData({
				...userData,
				[name]: value,
			});
		}
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (userData.password !== userData.confirmPassword) {
			toast.error(<p>Passwords do not match!</p>, {
				duration: 2000,
			});
			return;
		}

		if (!isPasswordValid(userData.password)) {
			toast.error(
				<p>Password should be at least 8 character long including letters, number and special characters</p>,
				{
					duration: 2000,
				}
			);
			return;
		}
		showLoader()
		if (token) {
			const updatedUserData = { ...userData, inviteToken: token };
			setUserData(updatedUserData);
		} else {
			useRegisterMutation.mutate(userData, {
				onSuccess: (data) => {
					const {
						user: { roles, companyRef },
						token,
					} = data;
					setCookies({ user: { roles, companyRef }, token });
					toast.success(<p>Registration Successful!</p>, {
						duration: 2000,
					});
					const redirectRoute = redirectUser(data.user.roles);
					router.replace(redirectRoute);
					hideLoader()
				},
				onError: (error) => {
					hideLoader()
					const axiosError = error as AxiosError<NSignUpApiResponseType>;
					if (axiosError.response && axiosError.response?.data && axiosError.response.data.message) {
						toast.error(<p>{axiosError.response.data.message}</p>, {
							duration: 2000,
						});
					} else {
						toast.error(<p>Something went wrong!</p>, {
							duration: 2000,
						});
					}
				},
			});
		}
	};

	return (
		<>
			<form onSubmit={(e) => handleSubmit(e)}>
				<div className="flex flex-col gap-x-4 gap-y-5 md:grid md:grid-cols-2 lg:gap-5">
					<div className="space-y-2">
						<Label>First Name</Label>
						<Input
							type="text"
							placeholder="Enter your first name"
							name="first"
							autoComplete="off"
							value={userData.name.first}
							onChange={(e) => handleInputChange(e)}
							className="[&>label>span]:font-medium, text-sm shadow-none placeholder:text-primary-foreground placeholder:opacity-30"
						/>
					</div>
					<div className="space-y-2">
						<Label>Last Name</Label>
						<Input
							type="text"
							placeholder="Enter your last name"
							name="last"
							autoComplete="off"
							value={userData.name.last}
							onChange={(e) => handleInputChange(e)}
							className="[&>label>span]:font-medium, text-sm shadow-none placeholder:text-primary-foreground placeholder:opacity-30"
						/>
					</div>
					<div className="col-span-2 space-y-2">
						<Label>Email</Label>
						<Input
							type="email"
							placeholder="Enter your email"
							name="email"
							autoComplete="off"
							value={userData.email}
							disabled={Boolean(token)}
							onChange={(e) => handleInputChange(e)}
							className="[&>label>span]:font-medium, col-span-2 text-sm shadow-none placeholder:text-primary-foreground placeholder:opacity-30"
						/>
					</div>
					<div className="space-y-2">
						<Label>Password</Label>
						<div className="relative">
							<Input
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								name="password"
								autoComplete="off"
								value={userData.password}
								onChange={(e) => handleInputChange(e)}
								className="text-sm shadow-none placeholder:text-primary-foreground placeholder:opacity-30"
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={handlePasswordVisibility}
								className="absolute right-0.5 top-[1px]"
							>
								{showPassword ? <IoMdEyeOff /> : <IoMdEye />}
							</Button>
						</div>
					</div>
					<div className="space-y-2">
						<Label>Confirm Password</Label>
						<div className="relative">
							<Input
								type={showConfirmPassword ? "text" : "password"}
								placeholder="Enter confirm password"
								name="confirmPassword"
								autoComplete="off"
								value={userData.confirmPassword}
								onChange={(e) => handleInputChange(e)}
								className="text-sm shadow-none placeholder:text-primary-foreground placeholder:opacity-30"
							/>
							<Button
								type="button"
								variant="ghost"
								size="icon"
								onClick={handleConfirmPasswordVisibility}
								className="absolute right-0.5 top-[1px]"
							>
								{showConfirmPassword ? <IoMdEyeOff /> : <IoMdEye />}
							</Button>
						</div>
					</div>
					<Button size="lg" type="submit" className="col-span-2 mt-2 border-[1px] border-primary-foreground" disabled={isButtonDisabled}>
						<span>Get Started</span> <PiArrowRightBold className="ms-2 mt-0.5 h-5 w-5" />
					</Button>
				</div>
			</form>
			<p className="mt-6 text-center leading-loose text-gray-500 lg:mt-8 lg:text-start">
				Don’t have an account?{" "}
				<Link href={routes.signIn} className="font-semibold text-gray-700 transition-colors hover:text-blue">
					Sign In
				</Link>
			</p>
		</>
	);
}

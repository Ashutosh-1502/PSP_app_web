"use client";

import { routes } from "@/config/routes";
import { useAuthAPI } from "@/module/auth/hooks/useAuth";
import { clearCookies } from "@/module/auth/utils/helpers";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Image from "next/image";
import { Label } from "@/components/ui/label";

// NOTE: Profile dropdown needs to be implemented here. For now it just contains a `sign-out` button.
export default function LogoutFooter() {
	const router = useRouter();
	const { useLogoutMutation } = useAuthAPI();

	const handleSignOut = async () => {
		try {
			await useLogoutMutation.mutateAsync();
			clearCookies();
			router.push(routes.signIn);
			toast.success("Logged out successfully!", {
				duration: 2000,
			});
		} catch {
			toast.error("Logout Failed", {
				duration: 2000,
			});
		}
	};

	return (
		<>
			{/* <Button onClick={() => void handleSignOut()}>Sign Out</Button> */}
			<Label
				onClick={() => void handleSignOut()}
				className="flex w-full cursor-pointer items-center justify-start gap-x-3 ps-6 text-lg pb-2 text-primary-foreground"
			>
				<div
								className=
									"flex h-6 w-6 items-center justify-center rounded-md bg-gray-200"
							>
								<Image src="/assets/svg/logout-icon.svg" alt="stripe-connect" width={13} height={13} />
							</div>
				Logout
			</Label>
		</>
	);
}

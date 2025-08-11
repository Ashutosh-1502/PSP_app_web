"use client";

import SignInForm from "@/module/auth/templates/sign-in-form";
import AuthWrapper from "@/module/auth/components/auth-wrapper";
import UnderlineShape from "@/components/shape/underline";
import Lottie from "lottie-react";
import structure from "@public/assets/gif/Structure.json";

export default function SignIn() {
	return (
		<AuthWrapper
			title={
				<>
					Welcome back! Please{" "}
					<span className="relative inline-block">
						Sign in to
						<UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-24 text-blue md:w-28 xl:-bottom-1.5 xl:w-36" />
					</span>{" "}
					continue.
				</>
			}
			description="By signing in, you will gain access to a wide range of Protein Data Bank entries, where you can find matching results for the given sequence."
			bannerTitle=""
			bannerDescription=""
			isSocialLoginActive={true}
			pageImage={
				<div className="flex justify-center aspect-[4/4] w-full">
					<Lottie animationData={structure} loop className="h-full w-full" />
				</div>
			}
		>
			<SignInForm />
		</AuthWrapper>
	);
}

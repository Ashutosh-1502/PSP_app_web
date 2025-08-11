"use client"

import UnderlineShape from "@/components/shape/underline";
import SignUpForm from "@/module/auth/templates/sign-up-form";
import AuthWrapper from "@/module/auth/components/auth-wrapper";
import { Suspense } from "react";
import Lottie from "lottie-react";
import structure from "@public/assets/gif/Structure.json";

export default function SignUp() {
	return (
		<AuthWrapper
			title={
				<>
					Join us -{" "}
					<span className="relative inline-block">
						SIGN UP!
						<UnderlineShape className="absolute -bottom-2 start-0 h-2.5 w-28 text-blue xl:-bottom-1.5 xl:w-36" />
					</span>
				</>
			}
			description="By signing in, you will gain access to a wide range of Protein Data Bank entries, where you can find matching results for the given sequence."
			bannerTitle=""
			bannerDescription=""
			isSocialLoginActive={true}
			pageImage={
				<div className="relative mx-auto aspect-[4/2] w-[600px] md:w-[720px] xl:w-[800px] 2xl:w-[900px]">
					<Lottie animationData={structure} loop className="h-full w-full" />
				</div>
			}
		>
			<Suspense>
				<SignUpForm />
			</Suspense>
		</AuthWrapper>
	);
}

"use client";

import Link from "next/link";
import { Typewriter } from "react-simple-typewriter";
import { useState } from "react";

export default function AuthWrapperOne({
	children,
	title,
	bannerTitle,
	bannerDescription,
	description,
	pageImage,
}: {
	children: React.ReactNode;
	title: React.ReactNode;
	description?: string;
	bannerTitle?: string;
	bannerDescription?: string;
	pageImage?: React.ReactNode;
	isSocialLoginActive?: boolean;
}) {
	const [showCursor, setShowCursor] = useState(true);
	return (
		<>
			<div className="flex min-h-screen flex-col px-4 py-8 pt-10 md:pt-12 lg:flex-row lg:p-6 xl:gap-x-10 xl:p-7 2xl:p-10 2xl:pt-10">
				{/* Left Side */}
				<div className="flex w-full items-center justify-center lg:w-6/12 2xl:justify-end 2xl:pe-24">
					<div className="w-[90%] lg:py-7 lg:ps-3 lg:pt-[3rem] 2xl:w-[630px] 2xl:max-w-none 2xl:ps-20 2xl:pt-7">
						<div className="mb-7 px-6 pt-3 text-center md:pt-0 lg:px-0 lg:text-start xl:mb-8 2xl:mb-10">
							<Link href="/" className="mb-6 inline-flex xl:mb-8 h-[20%]">
								<h1 className="text-5xl font-bold text-primary-foreground">
									<Typewriter
										words={["Protein Structure Prediction"]}
										loop={1}
										cursor={showCursor}
										cursorStyle="|"
										typeSpeed={70}
										deleteSpeed={0}
										delaySpeed={2000}
										onLoopDone={() => setShowCursor(false)}
									/>
								</h1>
							</Link>
							<h2 className="mb-5 text-[26px] leading-snug md:text-3xl md:!leading-normal lg:mb-7 lg:pe-16 lg:text-[28px] xl:text-3xl 2xl:pe-8 2xl:text-4xl text-primary-foreground">
								{title}
							</h2>
							<p className="leading-[1.85] text-gray-700 md:leading-loose lg:pe-8 2xl:pe-14 text-primary-foreground">{description}</p>
						</div>

						{children}
					</div>
				</div>

				{/* Right Side */}
				<div className="hidden w-full md:flex items-center justify-center rounded-[20px] px-6 lg:w-6/12 2xl:px-16">
					<div className="pb-8 pt-10 flex justify-center text-center xl:pt-16 2xl:block">
						<div className="mx-auto mb-10 max-w-sm pt-2 2xl:max-w-lg"></div>
						{pageImage}
					</div>
				</div>
			</div>
		</>
	);
}

"use client";

import Lottie from "lottie-react";


const Loader = ({loader, height = 30, width = 30}: {loader: any, height?: number, width?: number}) => {
	return (
		<div className="flex flex-col items-center justify-center">
			<Lottie animationData={loader} loop autoplay className={`w-[${width}%] h-[${height}%] mix-blend-multiply`}/>
		</div>
	);
};

export default Loader;

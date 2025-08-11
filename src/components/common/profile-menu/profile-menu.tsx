"use client";

import SearchBox from "@/components/common/search-box/search-box";
import { useState } from "react";

export default function ProfileMenu() {
	const [searchValue, setSearchValue] = useState("");

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value: string = e.target.value;
		setSearchValue(value);
	};

	return (
		<>
			<header>
				<SearchBox
					variant="outline"
					value={searchValue}
					onChange={handleInputChange}
					placeholder="Search for a reward"
				/>
			</header>
		</>
	);
}

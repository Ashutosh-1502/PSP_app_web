import { Input } from "@/components/ui/input";
import { type SearchBoxProps } from "@/types";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const SearchBox: React.FC<SearchBoxProps> = ({ value, onChange, ...props }) => {
	return (
		<div className="flex w-[100%] items-center rounded-md border border-input bg-gray-100 px-3">
			<span className="mr-4 text-gray-700">
				<PiMagnifyingGlassBold className="h-[18px] w-[18px]" />
			</span>
			<Input
				className="border-none p-0 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
				value={value}
				onChange={onChange}
				{...props}
			/>
		</div>
	);
};

export default SearchBox;

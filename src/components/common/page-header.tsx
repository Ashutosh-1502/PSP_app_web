import cn from "@/lib/utils/class-names";

export type PageHeaderTypes = {
	title: string;
	breadcrumb: { name: string; href?: string }[];
	className?: string;
};

export default function PageHeader({ title, children, className }: React.PropsWithChildren<PageHeaderTypes>) {
	return (
		<header
			className={cn("mb-6 flex flex-col @lg:flex-row @lg:items-center @lg:justify-between xs:-mt-2 lg:mb-7", className)}
		>
			<div>
				<p className="m-0 text-2xl font-semibold ">{title}</p>
			</div>
			{children}
		</header>
	);
}

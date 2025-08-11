import PageHeader from "@common/page-header";

const pageHeader = {
	title: "Account Settings",
	breadcrumb: [
		{
			name: "Account Settings",
		},
	],
};

export default function ProfileSettingsLayout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<PageHeader title={pageHeader.title} breadcrumb={pageHeader.breadcrumb} />
			{/* This will contain basic eedit parts */}
			{children}
		</>
	);
}

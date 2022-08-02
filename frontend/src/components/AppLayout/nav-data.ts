import type { SVGProps } from "react";
import DashboardIcon from "~icons/fluent/board-24-filled";
import ActivityIcon from "~icons/fluent/chart-multiple-24-filled";
import AuthorsIcon from "~icons/fluent/people-24-filled";
import FilesIcon from "~icons/fluent/document-copy-24-filled";

type NavLinkItem = {
	name: string;
	url: string;
	icon: (props: SVGProps<SVGSVGElement>) => React.ReactElement;
};

export const navLinkGroups: NavLinkItem[] = [
	{
		name: "Dashboard",
		url: "/dashboard",
		icon: DashboardIcon,
	},
	{
		name: "Activity",
		url: "/activity",
		icon: ActivityIcon,
	},
	{
		name: "Authors",
		url: "/authors",
		icon: AuthorsIcon,
	},
	{
		name: "Files",
		url: "/files",
		icon: FilesIcon,
	},
];

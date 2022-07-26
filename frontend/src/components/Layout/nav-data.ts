import type { INavLinkGroup } from "@fluentui/react";

export const navLinkGroups: INavLinkGroup[] = [
	{
		links: [
			{
				name: "Dashboard",
				key: "/dashboard",
				url: "/dashboard",
				links: [],
				icon: "GoToDashboard",
			},
			{
				name: "Activity",
				url: "#",
				links: [
					{
						name: "Overview",
						key: "/activity",
						url: "/activity",
						icon: "CalendarDay",
					},
					{
						name: "Top Activity Time",
						key: "/activity/time",
						url: "/activity/time",
						icon: "Clock",
					},
				],
			},
			{
				name: "Authors",
				url: "#",
				links: [
					{
						name: "List of Authors",
						key: "/authors/list",
						url: "/authors/list",
						icon: "People",
					},
					{
						name: "Commits by Authors",
						key: "/authors/commits",
						url: "/authors/commits",
						icon: "BranchCommit",
					},
					{
						name: "Top Authors",
						key: "/authors/top",
						url: "/authors/top",
						icon: "TeamFavorite",
					},
				],
			},
			{
				name: "Files",
				url: "#",
				links: [
					{
						name: "List of Files",
						key: "/files/list",
						url: "/files/list",
						icon: "Documentation",
					},
					{
						name: "Top File Extensions",
						key: "/files/extensions",
						url: "/files/extensions",
						icon: "FileCode",
					},
				],
			},
		],
	},
];

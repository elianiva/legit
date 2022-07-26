import { IStackStyles, Stack, Text } from "@fluentui/react";
import { INavStyles, Nav } from "@fluentui/react/lib/Nav";
import { useLocation } from "react-router-dom";
import { navLinkGroups } from "./nav-data";

const headerStyles: Partial<IStackStyles> = {
	root: {
		padding: "2rem",
	},
};

const navContainerStyles: Partial<INavStyles> = {
	root: {
		left: 0,
		bottom: 0,
		width: "30rem",
		height: "100%",
		boxSizing: "border-box",
		borderRight: "0.1rem solid #eee",
		overflowY: "auto",
	},
};

export function SideNav() {
	const location = useLocation();

	return (
		<Stack styles={navContainerStyles}>
			<Stack styles={headerStyles}>
				<Text variant="xLarge">Legit</Text>
				<Text>teknologi-umum/blog</Text>
			</Stack>
			<Nav ariaLabel="Navigation Bar" groups={navLinkGroups} selectedKey={location.pathname} />
		</Stack>
	);
}

import { IStackStyles, Stack } from "@fluentui/react";
import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";

const layoutStyles: Partial<IStackStyles> = {
	root: {
		height: "100%",
	},
};

export function Layout() {
	return (
		<Stack horizontal styles={layoutStyles}>
			<SideNav />
			<Outlet />
		</Stack>
	);
}

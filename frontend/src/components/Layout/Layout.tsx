import { Box, Grid } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SuspenseBoundary } from "../SuspenseBoundary";
import { SideNav } from "./SideNav";

export function Layout() {
	return (
		<Grid h="full" templateColumns="16rem 1fr">
			<SideNav />
			<Box h="full" w="full">
				<SuspenseBoundary>
					<Outlet />
				</SuspenseBoundary>
			</Box>
		</Grid>
	);
}

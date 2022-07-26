import { Box, HStack } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import { SideNav } from "./SideNav";

export function Layout() {
	return (
		<HStack h="full" w="full">
			<SideNav />
			<Box h="full" w="full">
				<Outlet />
			</Box>
		</HStack>
	);
}

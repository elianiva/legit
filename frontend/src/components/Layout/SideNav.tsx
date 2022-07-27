import { Box, HStack, Icon, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { ReactComponent as LogoIcon } from "~/icons/ic_logo.svg";
import { navLinkGroups as navLinkItems } from "./nav-data";

export function SideNav() {
	const location = useLocation();

	return (
		<Box bgColor="whiteAlpha.700" border="solid gray.800" borderRightWidth="1px" h="full" w="full">
			<Stack align="center" h={120} justify="center" p={6} spacing={4} w="full">
				<Icon as={LogoIcon} h={8} w="full" />
			</Stack>
			<Stack h="full" spacing={4} w="full">
				{navLinkItems.map((item) => {
					const isActive = location.pathname === item.url;
					return (
						<HStack
							key={item.url}
							_hover={{
								bgGradient: "linear(to-r, blackAlpha.50, transparent)",
								transition: "background-color ease-out 0.2s",
							}}
							as={Link}
							color="black"
							cursor="pointer"
							position="relative"
							px={6}
							py={3}
							spacing={2}
							sx={{
								"&::before": {
									content: '""',
									position: "absolute",
									right: 0,
									top: 2,
									bottom: 2,
									width: 1,
									rounded: "1rem 0 0 1rem",
									bgColor: isActive ? "blue.500" : "transparent",
									transition: "background-color ease-out 0.2s",
								},
								"&:hover::before": {
									bgColor: isActive ? "blue.500" : "gray.400",
								},
							}}
							to={item.url}
						>
							<Icon as={item.icon} color={isActive ? "blue.500" : "gray.500"} />
							<Text
								color={isActive ? "blue.500" : "gray.500"}
								fontWeight={isActive ? "semibold" : "normal"}
							>
								{item.name}
							</Text>
						</HStack>
					);
				})}
			</Stack>
		</Box>
	);
}

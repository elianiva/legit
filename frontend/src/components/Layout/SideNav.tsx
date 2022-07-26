import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Link, useLocation } from "react-router-dom";
import { navLinkGroups as navLinkItems } from "./nav-data";

export function SideNav() {
	const location = useLocation();

	return (
		<Box bgColor="whiteAlpha.600" h="full" w="full">
			<Stack h={120} p={6} w="full">
				<span>Legit</span>
				<span>teknologi-umum/blog</span>
			</Stack>
			<Stack h="full" spacing={2} w="full">
				{navLinkItems.map((item) => {
					const isActive = location.pathname === item.url;
					return (
						<Flex
							key={item.url}
							_hover={{
								bgColor: "blackAlpha.50",
								transition: "background-color ease-out 0.2s",
							}}
							as={Link}
							color="black"
							cursor="pointer"
							gap={4}
							position="relative"
							px={6}
							py={2}
							sx={{
								"&::before": {
									content: '""',
									position: "absolute",
									left: 0,
									top: 2,
									bottom: 2,
									width: 1,
									rounded: "0 1rem 1rem 0",
									bgColor: isActive ? "blue.500" : "transparent",
									transition: "background-color ease-out 0.2s",
								},
								"&:hover::before": {
									bgColor: isActive ? "blue.500" : "gray.400",
								},
							}}
							to={item.url}
						>
							<Text
								color={isActive ? "gray.800" : "gray.500"}
								fontWeight={isActive ? "semibold" : "normal"}
							>
								{item.name}
							</Text>
						</Flex>
					);
				})}
			</Stack>
		</Box>
	);
}

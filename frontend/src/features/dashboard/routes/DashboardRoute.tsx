import { IStackStyles, Stack, Text } from "@fluentui/react";

const containerStyles: Partial<IStackStyles> = {
	root: {
		width: "100%",
	},
};

export function DashboardRoute() {
	return (
		<Stack horizontalAlign="center" styles={containerStyles} verticalAlign="center">
			<Text>Hello World!</Text>
		</Stack>
	);
}

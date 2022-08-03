import { useState, useEffect } from "react";
import { Flex, Code, Box } from "@chakra-ui/react";
import { API_URL } from "~/constants/env";

type ProgressOutputProps = {
	cloneId: string;
};

export function ProgressOutput(props: ProgressOutputProps) {
	const [progressMessages, setProgressMessages] = useState<string[]>([]);

	useEffect(() => {
		const eventSource = new EventSource(`${API_URL}/registration/clone-progress/${props.cloneId}`);

		eventSource.onopen = () => setProgressMessages((prev) => ["Server Connected!", ...prev]);
		eventSource.addEventListener("data", (event: MessageEvent<string>) => {
			// tricks react to immediately re-render
			setTimeout(() => setProgressMessages((prev) => [event.data, ...prev]), 0);
		});
		eventSource.addEventListener("close", () => {
			setProgressMessages((prev) => ["Closing...", ...prev]);
			eventSource.close();
		});

		return () => eventSource.close();
	}, [props.cloneId]);

	return (
		<Box bgColor="gray.100" p={4} rounded="md">
			<Flex
				as="pre"
				direction="column-reverse"
				h={80}
				overflowY="auto"
				sx={{
					"&::-webkit-scrollbar": { width: 2 },
					"&::-webkit-scrollbar-thumb": {
						minHeight: 18,
						rounded: "full",
						bgColor: "gray.300",
					},
				}}
			>
				{progressMessages.map((message, index) => (
					<Code key={index} colorScheme="gray">
						{message}
					</Code>
				))}
			</Flex>
		</Box>
	);
}

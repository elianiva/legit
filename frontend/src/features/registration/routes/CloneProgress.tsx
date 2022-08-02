import { Flex, Text, Code, Box } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlassCard } from "~/components/GlassCard";
import { API_URL } from "~/constants/env";

export function CloneProgress() {
	const { cloneId } = useParams();
	const [repositoryUrl, setRepositoryUrl] = useState("");
	const [progressMessages, setProgressMessages] = useState<string[]>([]);

	useEffect(() => {
		const [_timestamp, url] = window.atob(cloneId as string).split("|");
		setRepositoryUrl(url);

		const eventSource = new EventSource(`${API_URL}/registration/clone-progress/${cloneId}`);

		eventSource.onopen = () => setProgressMessages((prev) => [...prev, "Server Connected!"]);
		eventSource.onmessage = (event: MessageEvent<string>) => {
			setProgressMessages((prev) => [event.data, ...prev]);
		};
		eventSource.addEventListener("close", () => {
			eventSource.close();
		});

		return () => eventSource.close();
	}, [cloneId]);

	return (
		<Flex align="center" h="full" justify="center" w="full">
			<GlassCard minW="container.sm">
				<Text mb={2} textAlign="center">
					Cloning <Code>{repositoryUrl}</Code>
				</Text>
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
							"&": { maskImage: "linear-gradient(to bottom, transparent 1%, black 30%)" },
						}}
					>
						{progressMessages.map((message, index) => (
							<Code key={index} colorScheme="gray">
								{message}
							</Code>
						))}
					</Flex>
				</Box>
			</GlassCard>
		</Flex>
	);
}

import { Flex, Text, Code } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlassCard } from "~/components/GlassCard";
import { ProgressOutput } from "../components/ProgressOutput";

export function CloneProgress() {
	const { cloneId } = useParams();
	const [repositoryUrl, setRepositoryUrl] = useState("");

	useEffect(() => {
		const [_timestamp, url] = window.atob(cloneId as string).split("|");
		setRepositoryUrl(url);
	}, [cloneId]);

	return (
		<Flex align="center" h="full" justify="center" w="full">
			<GlassCard minW="container.sm">
				<Text mb={2} textAlign="center">
					Cloning <Code>{repositoryUrl}</Code>
				</Text>
				<ProgressOutput cloneId={cloneId as string} />
			</GlassCard>
		</Flex>
	);
}

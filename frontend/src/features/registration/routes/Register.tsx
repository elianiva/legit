import { Button, Flex, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GlassCard } from "~/components/GlassCard";
import { useCloneRepository } from "../services/clone-repository";

export function Register() {
	const navigate = useNavigate();
	const [repositoryUrl, setRepositoryUrl] = useState("");
	const { mutate: cloneRepository, isLoading: isCloning } = useCloneRepository();

	function handleCloneRepository() {
		cloneRepository(
			{ url: repositoryUrl },
			{
				onSuccess: (cloneId) => {
					navigate(`/registration/progress/${cloneId}`, {
						state: { url: repositoryUrl },
					});
				},
			}
		);
	}

	return (
		<Flex align="center" h="full" justify="center" w="full">
			<GlassCard minW="container.sm">
				<Text mb={2}>Clone a repository</Text>
				<Stack align="center" w="full">
					<HStack w="full">
						<Input
							bgColor="white"
							isRequired
							onChange={(e) => setRepositoryUrl(e.currentTarget.value)}
							placeholder="Insert a valid git repository url"
							type="text"
							value={repositoryUrl}
						/>
						<Button colorScheme="blue" isLoading={isCloning} onClick={handleCloneRepository}>
							Clone
						</Button>
					</HStack>
				</Stack>
			</GlassCard>
		</Flex>
	);
}

import { Button, Flex, HStack, Icon, Input, Link, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate, Link as ReactLink } from "react-router-dom";
import { GlassCard } from "~/components/GlassCard";
import { ReactComponent as LogoIcon } from "~/icons/ic_logo.svg";
import { useCloneRepository } from "../services/clone-repository";
import { useRepositoriesList } from "../services/repositories-list";
import GitIcon from "~icons/ph/git-merge-fill";
import ChevronRightIcon from "~icons/fluent/chevron-right-24-regular";

export function Register() {
	const navigate = useNavigate();
	const [repositoryUrl, setRepositoryUrl] = useState("");
	const { mutate: cloneRepository, isLoading: isCloning } = useCloneRepository();
	const { data: repositories = [] } = useRepositoriesList();

	function handleCloneRepository() {
		cloneRepository(
			{ url: repositoryUrl },
			{ onSuccess: (cloneId) => navigate(`/registration/progress/${cloneId}`) }
		);
	}

	return (
		<Flex align="center" direction="column" gap={4} h="full" justify="center" w="full">
			<Icon as={LogoIcon} h={16} mb={8} w="full" />
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
			<GlassCard minW="container.sm">
				<Text align="center" fontSize="lg" fontWeight="semibold" mb={4}>
					Cloned Repositories
				</Text>
				<Stack gap={1}>
					{repositories.map((r) => (
						<Link
							key={`${r.author}/${r.name}`}
							_hover={{ filter: "brightness(0.95)" }}
							as={ReactLink}
							cursor="pointer"
							to={`/${r.author}/${r.name}/dashboard`}
						>
							<GlassCard alignItems="center" display="flex" gap={2}>
								<Icon as={GitIcon} />
								<Text>
									{r.author}/{r.name}
								</Text>
								<Icon as={ChevronRightIcon} color="gray.500" ml="auto" />
							</GlassCard>
						</Link>
					))}
				</Stack>
			</GlassCard>
		</Flex>
	);
}

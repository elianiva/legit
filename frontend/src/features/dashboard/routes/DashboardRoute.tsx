import {
	Box,
	Grid,
	Heading,
	Stat,
	StatArrow,
	StatHelpText,
	StatLabel,
	StatNumber,
	Table,
	Tbody,
	Td,
	Text,
	Tr,
} from "@chakra-ui/react";
import { GlassCard } from "~/components/GlassCard";
import { localiseNumber } from "~/utils/localise";
import { useOverview } from "../services/overview";
import { humaniseAge } from "../utils/humanise-age";
import { parseGitUrl } from "../utils/parse-git-url";

export function DashboardRoute() {
	const { data: overview } = useOverview();
	if (overview === undefined) return null;

	const { url: repositoryUrl, text: repositoryName } = parseGitUrl(overview.url);

	return (
		<Grid gap={6} gridTemplateColumns="repeat(4, 1fr)" p={8}>
			<Box>
				<Heading fontWeight="semibold" size="md">
					Dashboard
				</Heading>
			</Box>
			<GlassCard gridColumn="1/5">
				<Text fontWeight="medium" mb={4} size="sm">
					Repository Detail
				</Text>
				<Table size="custom">
					<Tbody>
						<Tr>
							<Td w={120}>Name</Td>
							<Td w={4}>:</Td>
							<Td>{repositoryName}</Td>
						</Tr>
						<Tr>
							<Td>Homepage</Td>
							<Td>:</Td>
							<Td>
								<Text as="a" color="blue.500" href={repositoryUrl} target="_blank">
									{repositoryUrl}
								</Text>
							</Td>
						</Tr>
						<Tr>
							<Td>Age</Td>
							<Td>:</Td>
							<Td>{humaniseAge(overview.age)}</Td>
						</Tr>
						<Tr>
							<Td>Total Files</Td>
							<Td>:</Td>
							<Td>{overview.totalFiles}</Td>
						</Tr>
						<Tr>
							<Td>Total Authors</Td>
							<Td>:</Td>
							<Td>{overview.totalAuthors}</Td>
						</Tr>
					</Tbody>
				</Table>
			</GlassCard>
			<GlassCard gridColumn="1/2">
				<Stat>
					<StatLabel color="grey">Lines in Total</StatLabel>
					<StatNumber>{localiseNumber(overview.lines?.total ?? 0)}</StatNumber>
					<StatHelpText mb={0}>
						<StatArrow type="decrease" />
						3.36%
					</StatHelpText>
				</Stat>
			</GlassCard>
			<GlassCard gridColumn="2/3">
				<Stat>
					<StatLabel color="grey">Lines Added</StatLabel>
					<StatNumber>{localiseNumber(overview.lines?.added ?? 0)}</StatNumber>
					<StatHelpText>
						<StatArrow type="increase" />
						23.36%
					</StatHelpText>
				</Stat>
			</GlassCard>
			<GlassCard gridColumn="3/4">
				<Stat>
					<StatLabel color="grey">Lines Deleted</StatLabel>
					<StatNumber>{localiseNumber(overview.lines?.deleted ?? 0)}</StatNumber>
					<StatHelpText>
						<StatArrow type="decrease" />
						2.36%
					</StatHelpText>
				</Stat>
			</GlassCard>
			<GlassCard gridColumn="4/5">
				<Stat>
					<StatLabel color="grey">Total of Commits</StatLabel>
					<StatNumber>{localiseNumber(overview.totalCommits)}</StatNumber>
					<StatHelpText>
						<StatArrow type="increase" />
						2.36%
					</StatHelpText>
				</Stat>
			</GlassCard>
		</Grid>
	);
}

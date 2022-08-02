import { Box, Grid, Heading, Stat, StatLabel, StatNumber, Table, Tbody, Td, Text, Tr } from "@chakra-ui/react";
import { GlassCard } from "~/components/GlassCard";
import { localiseNumber } from "~/utils/localise";
import { LineChart } from "../components/Chart";
import { useOverview } from "../services/overview";
import { humaniseAge } from "../utils/humanise-age";
import { parseGitUrl } from "../utils/parse-git-url";

export function Dashboard() {
	const { data: overview } = useOverview();
	if (overview === undefined) return null;

	const { url: repositoryUrl, text: repositoryName } = parseGitUrl(overview.url);

	return (
		<Grid gap={6} h="full" p={6} templateColumns="repeat(4, 1fr)" templateRows="1rem 1.625fr repeat(2, 1fr)">
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
							<Td>
								{overview.totalFiles} {overview.totalAuthors > 0 ? "Files" : "File"}
							</Td>
						</Tr>
						<Tr>
							<Td>Total Authors</Td>
							<Td>:</Td>
							<Td>
								{overview.totalAuthors} {overview.totalAuthors > 0 ? "People" : "Person"}
							</Td>
						</Tr>
					</Tbody>
				</Table>
			</GlassCard>
			<GlassCard gridColumn="1/3" gridRow="3/4" position="relative">
				<Stat left={4} position="absolute" top={4}>
					<StatLabel color="grey">Lines in Total</StatLabel>
					<StatNumber>{localiseNumber(overview.lines?.total ?? 0)}</StatNumber>
				</Stat>
				<Box
					bottom={4}
					left={4}
					overflow="hidden"
					position="absolute"
					right={4}
					rounded="lg"
					sx={{ "&": { maskImage: "linear-gradient(to right, transparent 20%, black 75%)" } }}
					top={4}
				>
					<LineChart />
				</Box>
			</GlassCard>
			<GlassCard gridColumn="3/5" gridRow="3/4" position="relative">
				<Stat>
					<StatLabel color="grey">Lines Added</StatLabel>
					<StatNumber>{localiseNumber(overview.lines?.added ?? 0)}</StatNumber>
				</Stat>
				<Box
					bottom={4}
					left={4}
					overflow="hidden"
					position="absolute"
					right={4}
					rounded="lg"
					sx={{ "&": { maskImage: "linear-gradient(to right, transparent 20%, black 75%)" } }}
					top={4}
				>
					<LineChart />
				</Box>
			</GlassCard>
			<GlassCard gridColumn="1/3" gridRow="4/5" position="relative">
				<Stat>
					<StatLabel color="grey">Lines Deleted</StatLabel>
					<StatNumber>{localiseNumber(overview.lines?.deleted ?? 0)}</StatNumber>
				</Stat>
				<Box
					bottom={4}
					left={4}
					overflow="hidden"
					position="absolute"
					right={4}
					rounded="lg"
					sx={{ "&": { maskImage: "linear-gradient(to right, transparent 20%, black 75%)" } }}
					top={4}
				>
					<LineChart />
				</Box>
			</GlassCard>
			<GlassCard gridColumn="3/5" gridRow="4/5" position="relative">
				<Stat>
					<StatLabel color="grey">Total of Commits</StatLabel>
					<StatNumber>{localiseNumber(overview.totalCommits)}</StatNumber>
				</Stat>
				<Box
					bottom={4}
					left={4}
					overflow="hidden"
					position="absolute"
					right={4}
					rounded="lg"
					sx={{ "&": { maskImage: "linear-gradient(to right, transparent 20%, black 75%)" } }}
					top={4}
				>
					<LineChart />
				</Box>
			</GlassCard>
		</Grid>
	);
}

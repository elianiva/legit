import { Box, Grid, Heading, Stat, StatArrow, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react";
import { GlassCard } from "~/components/GlassCard";

export function DashboardRoute() {
	return (
		<Grid gap={6} gridTemplateColumns="repeat(4, 1fr)" p={8}>
			<Box>
				<Heading fontWeight="semibold" size="md">
					Dashboard
				</Heading>
			</Box>
			<GlassCard gridColumn="1/2">
				<Stat>
					<StatLabel color="grey">Lines in Total</StatLabel>
					<StatNumber>340,020</StatNumber>
					<StatHelpText mb={0}>
						<StatArrow type="decrease" />
						3.36%
					</StatHelpText>
				</Stat>
			</GlassCard>
			<GlassCard gridColumn="2/3">
				<Stat>
					<StatLabel color="grey">Lines Added</StatLabel>
					<StatNumber>345,670</StatNumber>
					<StatHelpText>
						<StatArrow type="increase" />
						23.36%
					</StatHelpText>
				</Stat>
			</GlassCard>
			<GlassCard gridColumn="3/4">
				<Stat>
					<StatLabel color="grey">Lines Deleted</StatLabel>
					<StatNumber>5,650</StatNumber>
					<StatHelpText>
						<StatArrow type="decrease" />
						2.36%
					</StatHelpText>
				</Stat>
			</GlassCard>
			<GlassCard gridColumn="4/5">
				<Stat>
					<StatLabel color="grey">Total of Commits</StatLabel>
					<StatNumber>670</StatNumber>
					<StatHelpText>
						<StatArrow type="increase" />
						2.36%
					</StatHelpText>
				</Stat>
			</GlassCard>
		</Grid>
	);
}

import { Button, makeStyles, Text, tokens } from "@fluentui/react-components";
import { useHelloWorld } from "../services/hello";

const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		rowGap: tokens.spacingVerticalL,
	},
});

export function DashboardRoute() {
	const styles = useStyles();
	const { data: helloWorld, refetch } = useHelloWorld();

	return (
		<div className={styles.container}>
			<Text>{helloWorld}</Text>
			<Button onClick={() => refetch()}>Refresh</Button>
		</div>
	);
}

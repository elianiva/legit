import { makeStyles, tokens } from "@fluentui/react-components";

export const useStyles = makeStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		height: "100%",
		width: "100%",
		rowGap: tokens.spacingVerticalL,
	},
});

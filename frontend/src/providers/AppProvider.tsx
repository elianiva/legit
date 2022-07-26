import { type PropsWithChildren, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { FluentProvider, webLightTheme } from "@fluentui/react-components";

export function AppProvider(props: PropsWithChildren<{}>) {
	return (
		<FluentProvider theme={webLightTheme}>
			<Suspense fallback="Loading">
				<BrowserRouter>{props.children}</BrowserRouter>
			</Suspense>
		</FluentProvider>
	);
}

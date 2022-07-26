import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./providers";
import { AppRoutes } from "./routes";

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root") as HTMLElement
);

// ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
// 	<React.StrictMode>
// 		<AppProvider>
// 			<AppRoutes />
// 		</AppProvider>
// 	</React.StrictMode>
// );

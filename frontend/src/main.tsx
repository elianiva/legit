import React from "react";
import ReactDOM from "react-dom/client";
import { AppProvider } from "./providers";
import { AppRoutes } from "./routes";
import "./main.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
	<React.StrictMode>
		<AppProvider>
			<AppRoutes />
		</AppProvider>
	</React.StrictMode>
);

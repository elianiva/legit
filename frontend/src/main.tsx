import React from "react";
import ReactDOM from "react-dom";
import { AppProvider } from "./providers";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/500.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";
import { Routes } from "./routes/Routes";

ReactDOM.render(
	<React.StrictMode>
		<AppProvider>
			<Routes />
		</AppProvider>
	</React.StrictMode>,
	document.getElementById("root")
);

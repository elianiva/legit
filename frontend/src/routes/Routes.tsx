import { Navigate, useRoutes } from "react-router-dom";
import { lazyImport } from "~/utils";

const { AppRoutes } = lazyImport(() => import("./AppRoutes"), "AppRoutes");
const { RegistrationRoutes } = lazyImport(() => import("~/features/registration"), "RegistrationRoutes");

export function Routes() {
	return useRoutes([
		{
			path: "/registration/*",
			element: <RegistrationRoutes />,
		},
		{
			path: "/app/*",
			element: <AppRoutes />,
		},
		{
			path: "*",
			element: <Navigate replace to="/registration" />,
		},
	]);
}

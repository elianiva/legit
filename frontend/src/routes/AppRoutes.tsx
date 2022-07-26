import { Navigate, useRoutes } from "react-router-dom";
import { lazyImport } from "~/utils";

const { DashboardRoutes } = lazyImport(() => import("~/features/dashboard"), "DashboardRoutes");

export function AppRoutes() {
	return useRoutes([
		{
			path: "*",
			children: [
				{
					path: "dashboard/*",
					element: <DashboardRoutes />,
				},
				{
					path: "*",
					element: <Navigate to="/dashboard" />,
				},
			],
		},
	]);
}

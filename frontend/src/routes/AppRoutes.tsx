import { Navigate, useRoutes } from "react-router-dom";
import { Layout } from "~/components/Layout/Layout";
import { lazyImport } from "~/utils";

const { DashboardRoutes } = lazyImport(() => import("~/features/dashboard"), "DashboardRoutes");

export function AppRoutes() {
	return useRoutes([
		{
			path: "*",
			element: <Layout />,
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

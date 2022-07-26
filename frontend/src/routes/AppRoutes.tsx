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
					path: "activity/*",
					element: <h1>Activity</h1>,
				},
				{
					path: "authors/*",
					element: <h1>Authors</h1>,
				},
				{
					path: "files/*",
					element: <h1>Files</h1>,
				},
				{
					path: "*",
					element: <Navigate to="/dashboard" />,
				},
			],
		},
	]);
}

import { Navigate, useRoutes } from "react-router-dom";
import { AppLayout } from "~/components/AppLayout";
import { lazyImport } from "~/utils";

const { DashboardRoutes } = lazyImport(() => import("~/features/dashboard"), "DashboardRoutes");

export function AppRoutes() {
	return useRoutes([
		{
			path: "/:owner/:repo/*",
			element: <AppLayout />,
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
		{
			path: "*",
			element: <Navigate replace to="/" />,
		},
	]);
}

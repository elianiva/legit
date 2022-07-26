import { useRoutes } from "react-router-dom";
import { lazyImport } from "~/utils";

const { DashboardRoute } = lazyImport(() => import("./DashboardRoute"), "DashboardRoute");

export function DashboardRoutes() {
	return useRoutes([
		{
			index: true,
			element: <DashboardRoute />,
		},
	]);
}

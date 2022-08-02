import { useRoutes } from "react-router-dom";
import { lazyImport } from "~/utils";

const { Dashboard } = lazyImport(() => import("./Dashboard"), "Dashboard");

export function DashboardRoutes() {
	return useRoutes([
		{
			index: true,
			element: <Dashboard />,
		},
	]);
}

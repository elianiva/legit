import { Navigate, useRoutes } from "react-router-dom";
import { lazyImport } from "~/utils";

const { Register } = lazyImport(() => import("./Register"), "Register");
const { CloneProgress } = lazyImport(() => import("./CloneProgress"), "CloneProgress");

export function RegistrationRoutes() {
	return useRoutes([
		{
			index: true,
			element: <Register />,
		},
		{
			path: "progress/:cloneId",
			element: <CloneProgress />,
		},
		{
			path: "*",
			element: <Navigate replace to="/registration" />,
		},
	]);
}

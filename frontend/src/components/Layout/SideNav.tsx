import { useLocation } from "react-router-dom";
import { navLinkGroups } from "./nav-data";

export function SideNav() {
	const location = useLocation();

	return (
		<div className="sidenav">
			<div className="header">
				<span>Legit</span>
				<span>teknologi-umum/blog</span>
			</div>
			{/* <Nav ariaLabel="Navigation Bar" groups={navLinkGroups} selectedKey={location.pathname} /> */}
		</div>
	);
}

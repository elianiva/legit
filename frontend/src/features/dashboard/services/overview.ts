import { useQuery } from "@tanstack/react-query";
import type { GitOverviewResponse } from "~/stub/overview";

export function useOverview() {
	return useQuery<GitOverviewResponse>(["overview"]);
}

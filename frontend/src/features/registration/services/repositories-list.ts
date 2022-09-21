import { useQuery } from "@tanstack/react-query";
import type { GitRepository } from "~/stub/common";

export function useRepositoriesList() {
	return useQuery<GitRepository[]>(["registration/repositories"]);
}

/* eslint-disable */
export const protobufPackage = "legit";

export interface GitOverviewResponse {
	url: string;
	totalFiles: number;
	totalCommits: number;
	totalAuthors: number;
	age: Age | undefined;
	lines: Lines | undefined;
}

export interface Age {
	days: number;
	hours: number;
	minutes: number;
	seconds: number;
}

export interface Lines {
	total: number;
	added: number;
	deleted: number;
}

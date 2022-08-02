import ky, { type Options } from "ky";
import { API_URL } from "~/constants/env";

const kyInstance = ky.create({ prefixUrl: API_URL });

export async function http<TData>(url: string, options: Options) {
	const response = await kyInstance(url, options);
	const data = (await response.json()) as TData;
	return data;
}

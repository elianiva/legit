import { useMutation } from "@tanstack/react-query";
import type { RegistrationResponse, RegistrationRequest } from "~/stub/registration";
import { http } from "~/utils/http";

export function useCloneRepository() {
	return useMutation(async (request: RegistrationRequest) => {
		const { cloneId } = await http<RegistrationResponse>("registration/register", {
			method: "post",
			json: request,
		});
		return cloneId;
	});
}

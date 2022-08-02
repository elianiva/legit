/* eslint-disable */
export const protobufPackage = "legit";

export interface RegistrationRequest {
	url: string;
}

export interface RegistrationResponse {
	cloneId: string;
}

export interface CloneProgressRequest {
	cloneId: string;
}

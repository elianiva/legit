import ky from "ky";
import { API_URL } from "~/constants/env";

export const http = ky.create({ prefixUrl: API_URL });

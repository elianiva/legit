import { useQuery } from "@tanstack/react-query";

export function useHelloWorld() {
	return useQuery(["hello-world"], async () => {
		// TODO: remove
		return new Promise((res, rej) =>
			setTimeout(() => {
				const random = Math.random();
				if (random > 0.75) {
					res(`Hello World! - ${new Date().toLocaleString("en-GB")}`);
				} else {
					rej(new Error("TS2322 [ERROR]: Type 'number' is not assignable to type 'string'."));
				}
			}, 0)
		);
	});
}

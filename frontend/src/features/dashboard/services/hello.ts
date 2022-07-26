import { useQuery } from "@tanstack/react-query";

export function useHelloWorld() {
	return useQuery(["hello-world"], async () => {
		// TODO: remove
		await new Promise((res, rej) =>
			setTimeout(() => {
				const random = Math.random();
				if (random > 0.5) {
					res(undefined);
				} else {
					rej();
				}
			}, 2000)
		);

		return `Hello World! - ${new Date().toLocaleString("en-GB")}`;
	});
}

export function localiseNumber(number: number) {
	const formatter = new Intl.NumberFormat("en-GB");
	return formatter.format(number);
}

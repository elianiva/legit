import type { Age } from "~/stub/overview";

const listFormatter = new Intl.ListFormat();

function resolvePlural(text: string, number: number) {
	return number > 1 ? `${text}s` : text;
}

export function humaniseAge(age: Age | undefined) {
	if (age === undefined) return "";
	const { days, hours, minutes, seconds } = age;

	const day = days > 0 ? `${days} ${resolvePlural("Day", days)}` : undefined;
	const hour = hours > 0 ? `${hours} ${resolvePlural("Hour", hours)}` : undefined;
	const minute = minutes > 0 ? `${minutes} ${resolvePlural("Minute", minutes)}` : undefined;
	const second = seconds > 0 ? `${seconds}  ${resolvePlural("Second", seconds)}` : undefined;

	return listFormatter.format([day, hour, minute, second].filter((time): time is string => time !== undefined));
}

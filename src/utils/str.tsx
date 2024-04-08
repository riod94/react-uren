import { locales } from "../shared/constants";
import { StrFuncInterface, TimeAgoLocales } from "../shared/interfaces";

function camelCase(str = ""): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
		.replace(/\s+/g, "");
}

function isJson(str = ""): boolean {
	try {
		JSON.parse(str);
		return true;
	} catch (e) {
		return false;
	}
}

function isUrl(str = ""): boolean {
	try {
		new URL(str);
		return true;
	} catch (e) {
		return false;
	}
}

function kebabCase(str = ""): string {
	return str
		.replace(/([a-z])([A-Z])/g, "$1-$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1-$2")
		.toLowerCase();
}

function random(length = 16): string {
	return Math.random()
		.toString(36)
		.substring(2, length + 2);
}

function studlyCase(str = ""): string {
	return str
		.replace(/(?:^\w|[A-Z]|\b\w)/g, (word) => word.toUpperCase())
		.replace(/\s+/g, "");
}

function snakeCase(str = ""): string {
	return str
		.replace(/([a-z])([A-Z])/g, "$1_$2")
		.replace(/([A-Z])([A-Z][a-z])/g, "$1_$2")
		.toLowerCase();
}

function timeAgo(
	time: string | number | Date,
	lang: string = "en",
	customLocales: TimeAgoLocales = {}
): string {
	if (typeof time === "string") {
		time = +new Date(time);
	} else if (typeof time === "object" && time instanceof Date) {
		time = time.getTime();
	} else if (typeof time !== "number") {
		time = +new Date();
	}

	const locale: Record<string, string | undefined> = {
		...locales[lang],
		...customLocales[lang],
	};

	let timeFormats: [number, string, string | number][] = [
		[60, "seconds", 1], // 60
		[120, "oneMinuteAgo", "oneMinuteFromNow"], // 60*2
		[3600, "minutes", 60], // 60*60, 60
		[7200, "oneHourAgo", "oneHourFromNow"], // 60*60*2
		[86400, "hours", 3600], // 60*60*24, 60*60
		[172800, "yesterday", "tomorrow"], // 60*60*24*2
		[604800, "days", 86400], // 60*60*24*7, 60*60*24
		[1209600, "lastWeek", "nextWeek"], // 60*60*24*7*4*2
		[2419200, "weeks", 604800], // 60*60*24*7*4, 60*60*24*7
		[4838400, "lastMonth", "nextMonth"], // 60*60*24*7*4*2
		[29030400, "months", 2419200], // 60*60*24*7*4*12, 60*60*24*7*4
		[58060800, "lastYear", "nextYear"], // 60*60*24*7*4*12*2
		[2903040000, "years", 29030400], // 60*60*24*7*4*12*100, 60*60*24*7*4*12
		[5806080000, "lastCentury", "nextCentury"], // 60*60*24*7*4*12*100*2
		[58060800000, "centuries", 2903040000], // 60*60*24*7*4*12*100*20, 60*60*24*7*4*12*100
	];

	let seconds = (Date.now() - time) / 1000;
	let token: string = "ago";
	let list_choice: number = 1;

	if (seconds === 0) {
		return locale.justNow || "just now";
	}

	if (seconds < 0) {
		seconds = Math.abs(seconds);
		token = "from now";
		list_choice = 2;
	}

	let i = 0;
	while (i < timeFormats.length) {
		let format = timeFormats[i];
		if (format && seconds < format[0]) {
			if (typeof format[2] === "string") {
				return locale[(format[list_choice] || "").toString()] || format[2];
			} else {
				return `${Math.floor(seconds / format[2])} ${locale[format[1]]} ${
					locale[token]
				}`;
			}
		}
		i++;
	}

	return time.toString();
}

function slugify(str: string, separator = "-"): string {
	let slug: string = str
		.trim()
		.toLowerCase()
		.replace(/[^a-z0-9 -]/g, separator)
		.replace(/\s+/g, separator)
		.replace(/-+/g, separator);

	return slug;
}

function capitalize(slug: string, delimiter = " "): string {
	return slug
		.split(delimiter)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(" ");
}

function numToAlpha(num: number): string | null {
	if (num === 0) {
		return String.fromCharCode(65);
	}

	let result: string = "";
	let charCodeA: number = 65;

	while (num > 0) {
		let remainder: number = num % 26;
		result = String.fromCharCode(charCodeA + remainder) + result;
		num = Math.floor((num - remainder) / 26);
	}

	return result || null;
}

const Str: StrFuncInterface = {
	camel: (str = "") => camelCase(str),
	timeAgo: (time, lang?, customLocales?) => timeAgo(time, lang, customLocales),
	numToAlpha: (number = 0) => numToAlpha(number),
	isJson: (str = "") => isJson(str),
	isUrl: (str = "") => isUrl(str),
	kebab: (str = "") => kebabCase(str),
	length: (str = "") => str?.length,
	limit: (str = "", limit = 100) => str?.substring(0, limit),
	random: (length = 16) => random(length),
	studly: (str = "") => studlyCase(str),
	snake: (str = "") => snakeCase(str),
	slug: (str = "", separator = "-") => slugify(str, separator),
	title: (str = "", delimiter = " ") => capitalize(str, delimiter),
};

export default Str;

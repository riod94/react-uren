import logger from "./logger";
import Str from "./str";

const getAcronym = (phrase: string, length: number = 3): string => {
	return phrase ? phrase
		.toUpperCase()
		.split(/\s/)
		.reduce((acronym, word) => acronym + word[0], "")
		.substring(0, length)
		: "";
}

const getFileToBase64 = (file: File): Promise<string> => {
	return new Promise((resolve, reject) => {
		let baseURL = "";
		// Make new FileReader
		let reader = new FileReader();

		// Convert the file to base64 text
		reader.readAsDataURL(file);

		// Handle successful file reading
		reader.onload = () => {
			baseURL = reader.result as string;
			resolve(baseURL);
		};

		// Handle file reading error
		reader.onerror = (error) => {
			reject(error);
		};
	});
};

const getUid = (length: number = 6, prefix: string = "", suffix: string = ""): string => {
	let result = "";
	const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	const charactersLength = characters.length;

	// Calculate the number of characters to take from timestamp
	const timestampChars = Math.floor(length / 2); // Take half of the remaining length for timestamp

	for (let i = 0; i < length - timestampChars; i++) {
		result += characters.charAt(Math.floor(Math.random() * charactersLength));
	}

	// Generate unique timestamp and take only the calculated characters
	const uniqueTimestamp = timestampChars > 0 ? Date.now().toString(36).slice(-timestampChars) : "";

	return prefix + uniqueTimestamp + result + suffix;
};

const generateCharcodesArray = (start: number, end: number): number[] => {
	const charcodes: number[] = [];

	for (let i = start; i <= end; i++) {
		charcodes.push(i);
	}

	return charcodes;
};

export {
	getUid,
	generateCharcodesArray,
	getAcronym,
	getFileToBase64,
	logger,
	Str,
}
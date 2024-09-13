import { sub, parseISO } from "date-fns";
import { utcToZonedTime } from "date-fns-tz";

/**
 * Extracts the YouTube video ID from a given YouTube link.
 *
 * @param {string} youtubeLink - The YouTube link to extract the video ID from.
 * @return {string} The extracted YouTube video ID, or an empty string if the link is invalid.
 */
export const extractYoutubeLink = (youtubeLink: string) => {
	if (youtubeLink.includes("https://www.youtube.com/watch?v=")) {
		return youtubeLink.replace("https://www.youtube.com/watch?v=", "");
	} else return "";
};

/**
 * Checks if a game is currently live based on the given date.
 *
 * @param {Date} date - The date of the game.
 * @return {boolean} Returns true if the game is live, false otherwise.
 */
export const isLiveGame = (date) => {
	let now = new Date().getTime();
	const anHourAgo = sub(now, { hours: 1 }).getTime();
	const gameDate = new Date(date).getTime();

	// if game time is after current time AND before current time - 1 hour, return true
	const isLive = now >= gameDate && gameDate >= anHourAgo;

	return isLive;
};

/**
 * Extracts the Instagram username from a given Instagram string.
 *
 * @param {string} instagram - The Instagram string to extract the username from.
 * @return {string|null} The extracted Instagram username, or null if no valid username is found.
 */
export const extractInstagramUsername = (instagram: string) => {
	if (!instagram) return;

	if (instagram.includes("instagram.com")) {
		const match = instagram.match(/(?:instagram\.com\/)([\w\d._]+)/);

		if (match && match.length > 1) return match[1];
	}

	return instagram.replace("@", "");
};

/**
 * Converts a given ISO date string to a Date object in the Eastern Standard Time (EST) timezone.
 *
 * @param {Date} isoDate - The ISO date string to convert.
 * @return {Date} The converted Date object in the EST timezone.
 */
export const convertToEST = (isoDate: Date) => {
	return new Date(utcToZonedTime(isoDate, "America/Toronto"));
};

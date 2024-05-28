import { sub, isAfter, parseISO } from "date-fns";

export const extractYoutubeLink = (youtubeLink: string) => {
	if (youtubeLink.includes("https://www.youtube.com/watch?v=")) {
		return youtubeLink.replace("https://www.youtube.com/watch?v=", "");
	} else return "";
};

export const isLiveGame = (date) => {
	let now = new Date();
	const anHourAgo = sub(now, { hours: 1 });

	// if game time is after current time AND before current time - 1 hour, return true
	return isAfter(now, parseISO(date)) && isAfter(parseISO(date), anHourAgo);
};

export const extractInstagramUsername = (instagram: string) => {
	if (!instagram) return;

	// Check if the Instagram string contains a URL
	if (instagram.includes("instagram.com")) {
		// Extract the username using regular expression
		const match = instagram.match(/(?:instagram\.com\/)([\w\d._]+)/);
		// Check if a match is found and return the username

		if (match && match.length > 1) return match[1];
		// If it's just a handle, return it directly
		else return instagram.replace("@", "");
	}

	// Return null if no valid username is found
	return null;
};

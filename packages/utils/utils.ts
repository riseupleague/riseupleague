export const extractYoutubeLink = (youtubeLink: string) => {
	if (youtubeLink.includes("https://www.youtube.com/watch?v=")) {
		return youtubeLink.replace("https://www.youtube.com/watch?v=", "");
	} else return "";
};

export const isLiveGame = (date) => {
	const HOUR = 1000 * 60 * 60;
	const anHourAgo = Date.now() - HOUR;

	return date > anHourAgo && Date.now() > date;
};

export const extractInstagramUsername = (instagram: string) => {
	if (!instagram) return;
	// Check if the Instagram string contains a URL
	if (instagram.includes("instagram.com")) {
		// Extract the username using regular expression
		const match = instagram.match(/(?:instagram\.com\/)([\w\d._]+)/);
		// Check if a match is found and return the username
		if (match && match.length > 1) {
			return match[1];
		}
	} else {
		// If it's just a handle, return it directly
		return instagram.replace("@", "");
	}
	// Return null if no valid username is found
	return null;
};

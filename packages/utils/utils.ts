export const extractYoutubeLink = (youtubeLink: string) => {
	if (youtubeLink.includes("https://www.youtube.com/watch?v=")) {
		return youtubeLink.replace("https://www.youtube.com/watch?v=", "");
	} else return "";
};

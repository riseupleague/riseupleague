export const isLiveGame = (date) => {
	const HOUR = 1000 * 60 * 60;
	const anHourAgo = Date.now() - HOUR;

	return date > anHourAgo && Date.now() > date;
};

export const isWithin24Hours = (dateCreated) => {
	const currentTimestampInSeconds = Date.now() / 1000;
	const dateCreatedInSeconds = new Date(dateCreated).getTime() / 1000;

	const differenceInSeconds = currentTimestampInSeconds - dateCreatedInSeconds;
	const differenceInHours = differenceInSeconds / (60 * 60);
	return differenceInHours <= 24;
};

import { utcToZonedTime } from "date-fns-tz";

export const convertToEST = (isoDate: Date) => {
	return utcToZonedTime(isoDate, "America/Toronto");
};

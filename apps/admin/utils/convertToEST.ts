import { utcToZonedTime } from "date-fns-tz";

export const convertToEST = (isoDate: Date) => {
	return new Date(utcToZonedTime(isoDate, "America/Toronto"));
};

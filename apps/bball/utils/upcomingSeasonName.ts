import Season from "@/api-helpers/models/Season";

export const upcomingSeasonName = async () => {
	const [season] = await Season.find({ register: true });
	return season?.seasonName;
};

export const convertMilitaryToRegularTime = (militaryTime) => {
	if (militaryTime) {
		// Parse the military time
		const [hours, minutes] = militaryTime.split(":").map(Number);

		// Determine whether it's morning or afternoon
		const period = hours < 12 ? "AM" : "PM";

		// Convert hours to 12-hour format
		const regularHours = hours % 12 || 12;

		// Format the result
		const regularTime = `${regularHours}:${String(minutes).padStart(
			2,
			"0"
		)} ${period}`;

		return regularTime;
	}
};

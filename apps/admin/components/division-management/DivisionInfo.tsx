const DivisionInfo = ({ division }): JSX.Element => {
	return (
		<div className="mb-4 grid grid-cols-1 md:grid-cols-2 md:gap-x-1">
			<h5>Name: {division?.divisionName}</h5>
			<h5>Location: {division?.location}</h5>
			<h5>Description: {division?.description}</h5>
			<h5>City: {division?.city}</h5>
			<h5>Day: {division?.day}</h5>
			<h5>Start Time: {division?.startTime}</h5>
			<h5>End Time: {division?.endTime}</h5>
			{division?.earlyBirdPrice && (
				<>
					<h5>Early Bird Price: {division?.earlyBirdPrice}</h5>
					<h5>Early Bird Team Price: {division?.earlyBirdTeamPrice}</h5>
					<h5>
						Early Bird Open:{" "}
						<span
							className={`${division?.earlyBirdOpen ? "text-green-400" : "text-primary"}`}
						>
							{division?.earlyBirdOpen.toString()}
						</span>
					</h5>
				</>
			)}
			<h5>Regular Price: {division?.regularPrice}</h5>
			<h5>Regular Team Price: {division?.regularTeamPrice}</h5>
			<h5>Regular Instalment Price (x6): {division?.instalmentPrice}</h5>
			<h5>Regular Team Price ID: {division?.regularTeamPriceId}</h5>
			<h5>Regular Instalment Price ID: {division?.regularPriceInstalmentId}</h5>
			<h5>Early Bird ID: {division?.earlyBirdId}</h5>
			<h5>Regular Full Price ID: {division?.regularPriceFullId}</h5>
		</div>
	);
};

export default DivisionInfo;

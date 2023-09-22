"use client";

const FilterByDivision = ({
	selectedDivision,
	handleDivisionChange,
	divisions,
}) => {
	return (
		<select
			value={selectedDivision}
			onChange={handleDivisionChange}
			className="w-1/4 rounded-md border px-2 py-1 text-black"
		>
			<option value="">All Divisions</option>
			{divisions.map((division) => (
				<option key={division._id} value={division.divisionName}>
					{division.divisionName}
				</option>
			))}
		</select>
	);
};

export default FilterByDivision;

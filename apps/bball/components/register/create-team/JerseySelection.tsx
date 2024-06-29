import { useState } from "react";

const JerseySelection = () => {
	const [isEditionSelected, setIsEditionSelected] = useState(false);
	const [jerseyEdition, setJerseyEdition] = useState("");
	const handleJerseyEdition = (edition) => {
		setJerseyEdition(edition);
	};

	return (
		<div>
			<h3 className="mt-10 text-3xl font-medium uppercase ">
				Select Your Edition
			</h3>

			{!isEditionSelected && (
				<div className="mt-10 flex flex-col gap-10 md:flex-row ">
					<button
						onClick={() => handleJerseyEdition("retro")}
						className="flex flex-col gap-5 rounded-md bg-neutral-700 px-[16px] py-[26px] text-start "
					>
						<span className="font-barlow text-4xl uppercase">Retro</span>
					</button>

					<button
						onClick={() => handleJerseyEdition("original")}
						className="flex flex-col gap-5 rounded-md bg-neutral-700 px-[16px] py-[26px] text-start "
					>
						<span className="font-barlow text-4xl uppercase">Original</span>
					</button>

					<button
						onClick={() => handleJerseyEdition("classic")}
						className="rounded-5 flex flex-col gap-5 bg-neutral-700 px-[16px] py-[26px] text-start "
					>
						<span className="font-barlow text-4xl uppercase">Classic</span>
					</button>
				</div>
			)}

			{isEditionSelected && <div></div>}
		</div>
	);
};

export default JerseySelection;

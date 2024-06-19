import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Skeleton } from "@ui/components/skeleton";
import dynamic from "next/dynamic";
import Link from "next/link";

const UserPlayerJerseyInfo = ({ player }) => {
	const jerseyEdition = player.team?.jerseyEdition;
	let edition; // Assuming team.jerseyEdition is a string like "retro-1", "original-1", or "classic-1"

	if (jerseyEdition) edition = jerseyEdition.split("-")[0];

	// Dynamic import of the component
	const DynamicComponent = dynamic(
		() => import(`@/lib/jersey-designs/${edition}/${jerseyEdition}`),
		{
			loading: () => (
				<Skeleton className="flex h-96 w-full items-center justify-center bg-neutral-600 text-neutral-400">
					Loading Jersey...
				</Skeleton>
			),
			ssr: false,
		}
	);

	return (
		<>
			{jerseyEdition && jerseyEdition !== "" ? (
				<div className="w-full rounded border border-neutral-600 bg-neutral-700 px-4 py-2">
					<style id="styleElement">
						{`.primaryColorFill {
								fill: ${player.team.primaryColor} !important;
							}
							.primaryColorStroke {
								stroke: ${player.team.primaryColor} !important;
							}
							.tertiaryColorFill {
								fill: ${player.team.tertiaryColor} !important;
							}
							.tertiaryColorStroke {
								stroke: ${player.team.tertiaryColor} !important;
							}
							.secondaryColorFill {
								fill: ${player.team.secondaryColor} !important;
							}
							.secondaryColorStroke {
								stroke: ${player.team.secondaryColor} !important;
							}
							.jerseyDiv {
								background-color: rgb(17 22 29 / var(--tw-bg-opacity));
							}
						`}
					</style>
					<div className="flex flex-col">
						<h3 className="my-2 text-center">
							Jersey Edition: {player.team.jerseyEdition}
						</h3>
						<DynamicComponent />
						{player.team.primaryColor && (
							<div className="my-3 flex justify-between rounded border border-neutral-600 p-4">
								<div className="font-barlow flex items-center gap-2 text-xs md:text-sm">
									<div
										className={`font-barlow h-1 w-1 rounded-full md:h-2  md:w-2 bg-[${player.team.primaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
										style={{
											backgroundColor: `${player.team.primaryColor}`,
										}}
									></div>
									Primary
								</div>
								<div className="font-barlow flex items-center gap-2 text-xs md:text-sm">
									<div
										className={`font-barlow h-1 w-1 rounded-full md:h-2  md:w-2 bg-[${player.team.secondaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
										style={{
											backgroundColor: `${player.team.secondaryColor}`,
										}}
									></div>
									Secondary
								</div>
								<div className="font-barlow flex items-center gap-2 text-xs md:text-sm">
									<div
										className={`font-barlow h-1 w-1 rounded-full md:h-2  md:w-2 bg-[${player.team.tertiaryColor}] relative p-4 font-bold text-white sm:h-8 sm:w-8 lg:w-full `}
										style={{
											backgroundColor: `${player.team.tertiaryColor}`,
										}}
									></div>
									Tertiary
								</div>
							</div>
						)}
					</div>

					<Button className="my-4 w-full capitalize" asChild>
						<Link href={`/jersey/${player.team._id}`}>Edit Jersey</Link>
					</Button>
				</div>
			) : (
				<>
					{player.team && (
						<div className="flex h-96 flex-1 flex-col justify-between gap-3 rounded-md border border-neutral-600 bg-neutral-700 px-[16px] py-[26px]">
							<div>
								<h3 className=" text-2xl font-semibold uppercase ">
									Team Jersey
								</h3>
								<Separator
									orientation="horizontal"
									className="mb-3 mt-1 bg-white"
								/>{" "}
								<p>
									Customize your team jersey. You decide your own colors and
									designs!
								</p>
							</div>
							<Link
								className="font-barlow w-full rounded bg-neutral-100 px-12 py-2 text-center font-bold uppercase text-neutral-900 transition hover:bg-neutral-200"
								href={`/jersey/${player.team?._id}`}
							>
								Continue
							</Link>
						</div>
					)}
				</>
			)}
		</>
	);
};

export default UserPlayerJerseyInfo;

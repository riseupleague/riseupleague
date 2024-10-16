import { unstable_noStore as noStore } from "next/cache";
import { getAllDivisionsWithTeamsByActiveSeason } from "@/api-helpers/controllers/divisions-controller";
import { DivisionWithStats } from "@/types";
import HomeStandingsTable from "./HomeStandingsTable";
import Image from "next/image";
import { Button } from "@ui/components/button";
import Link from "next/link";
import { connectToDatabase } from "@/api-helpers/utils";

const HomeCurrentSeasonStandings = async (): Promise<JSX.Element> => {
	noStore();

	await connectToDatabase();

	const resDivisions = await getAllDivisionsWithTeamsByActiveSeason();

	const { divisionsWithStats }: { divisionsWithStats: DivisionWithStats[] } =
		await resDivisions.json();

	return (
		<section className="font-barlow mb-8 flex w-full flex-col justify-between text-neutral-100 lg:w-1/3">
			{/* <div className="relative w-full overflow-hidden rounded-lg md:w-1/2">
				<div className="absolute inset-0 bg-black opacity-50"></div>

				<Image
					src="/images/home/photos.jpg"
					alt="Basketball court"
					layout="fill" // Ensure the image fills the parent
					objectFit="cover" // Maintain aspect ratio while covering the container
					className="opacity-30" // Keep rounded corners on the image
				/>

				<div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-white">
					<h2 className="mb-4 text-center text-3xl font-bold">
						We upload your game photos every week! Dont forget to tag us!{" "}
					</h2>

					<Button variant="register2" size="register2" asChild>
						<Link
							target="_blank"
							href={
								"https://drive.google.com/drive/u/1/folders/1bGVX8fo7WJwfx2IOEp_ZgEfHb21qsdx-"
							}
						>
							Check Photos
						</Link>
					</Button>
				</div>
			</div> */}

			<HomeStandingsTable divisionsWithStats={divisionsWithStats} />
		</section>
	);
};

export default HomeCurrentSeasonStandings;

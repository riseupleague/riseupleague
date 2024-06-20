import { extractInstagramUsername } from "@utils/utils";
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/ui/table";
import Link from "next/link";

const TeamPlayersTable = ({ teamPlayers }) => (
	<>
		<h2 className="my-10 flex justify-between">Players </h2>

		<Table>
			<TableCaption className="text-lg text-neutral-300">
				{teamPlayers.length} players
			</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="text-left">Player Name</TableHead>
					<TableHead className="text-left">Instagram</TableHead>
					<TableHead className="text-left">Email</TableHead>
					<TableHead className="text-left">User</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{teamPlayers
					.sort((a, b) => (a.playerName > b.playerName ? 1 : -1))
					.map((player, index) => (
						<TableRow key={index} className="text-nowrap text-lg">
							<TableCell className="flex text-left ">
								<Link
									className="hover:underline"
									href={`/team-management/player/${player._id}`}
								>
									{player?.playerName}
									{player?.teamCaptain && (
										<span className="text-primary"> - Team Captain</span>
									)}
								</Link>
							</TableCell>
							<TableCell className="text-left lowercase">
								<Link
									href={`https://instagram.com/${extractInstagramUsername(player?.instagram)}`}
									className="transition-all hover:text-neutral-300 hover:underline"
									target="_blank"
								>
									{extractInstagramUsername(player?.instagram)}
								</Link>
							</TableCell>
							<TableCell className="text-left">{player?.user?.email}</TableCell>
							<TableCell className="text-left">{player?.user?.name}</TableCell>
						</TableRow>
					))}
			</TableBody>
		</Table>
	</>
);

export default TeamPlayersTable;

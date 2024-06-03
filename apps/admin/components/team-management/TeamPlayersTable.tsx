import { extractInstagramUsername } from "@utils/utils";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/ui/table";
import Link from "next/link";

const TeamPlayersTable = ({ teamPlayers }) => (
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead className="text-left">Player Name</TableHead>
				<TableHead className="text-left">Instagram</TableHead>
				<TableHead className="text-left">Email</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{teamPlayers
				.sort((a, b) => (a.playerName > b.playerName ? 1 : -1))
				.map((player, index) => (
					<TableRow key={index} className="text-lg">
						<TableCell className="text-left capitalize">
							{player?.playerName}
							{player?.teamCaptain && (
								<span className="text-primary"> - Team Captain</span>
							)}
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
						<TableCell className="text-left">{player?.email}</TableCell>
					</TableRow>
				))}
		</TableBody>
	</Table>
);

export default TeamPlayersTable;

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

const FreeAgentsTable = ({ freeAgents }) => (
	<Table>
		<TableHeader>
			<TableRow>
				<TableHead className="text-left">Player Name</TableHead>
				<TableHead className="text-left">Team Name</TableHead>
				<TableHead className="text-left">Division Name</TableHead>
				<TableHead className="text-left">Instagram</TableHead>
				<TableHead className="text-left">Email</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{freeAgents
				.sort((a, b) => (a.playerName > b.playerName ? 1 : -1))
				.map((freeAgent, index) => (
					<TableRow key={index} className="text-lg">
						<TableCell className="text-left">{freeAgent?.playerName}</TableCell>
						<TableCell className="text-left">
							{freeAgent?.team?.teamName}
						</TableCell>
						<TableCell className="text-left">
							{freeAgent?.division?.divisionName}
						</TableCell>
						<TableCell className="text-left lowercase">
							<Link
								href={`https://instagram.com/${extractInstagramUsername(freeAgent?.instagram)}`}
								className="transition-all hover:text-neutral-300 hover:underline"
								target="_blank"
							>
								{extractInstagramUsername(freeAgent?.instagram)}
							</Link>
						</TableCell>
						<TableCell className="text-left">{freeAgent?.email}</TableCell>
					</TableRow>
				))}
		</TableBody>
	</Table>
);

export default FreeAgentsTable;

import { extractInstagramUsername } from "@/utils/extractInstagram";
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
				<TableHead className="text-left text-sm lg:text-lg">
					Player Name
				</TableHead>
				<TableHead className="text-left text-sm lg:text-lg">
					Team Name
				</TableHead>
				<TableHead className="text-left text-sm lg:text-lg">
					Division Name
				</TableHead>
				<TableHead className="text-left text-sm lg:text-lg">
					Instagram
				</TableHead>
				<TableHead className="text-left text-sm lg:text-lg">Email</TableHead>
			</TableRow>
		</TableHeader>
		<TableBody>
			{freeAgents
				.sort((a, b) => (a.playerName > b.playerName ? 1 : -1))
				.map((freeAgent, index) => (
					<TableRow key={index} className="text-lg">
						<TableCell className="text-left text-sm lg:text-lg">
							{freeAgent?.playerName}
						</TableCell>
						<TableCell className="text-left text-sm lg:text-lg">
							{freeAgent?.team?.teamName}
						</TableCell>
						<TableCell className="text-left text-sm lg:text-lg">
							{freeAgent?.division?.divisionName}
						</TableCell>
						<TableCell className="text-left lowercase">
							<Link
								href={`https://instagram.com/${extractInstagramUsername(freeAgent?.instagram)}`}
								className="text-sm transition-all hover:text-neutral-300 hover:underline lg:text-lg"
								target="_blank"
							>
								{extractInstagramUsername(freeAgent?.instagram)}
							</Link>
						</TableCell>
						<TableCell className="text-left text-sm lg:text-lg">
							{freeAgent?.user?.email}
						</TableCell>
					</TableRow>
				))}
		</TableBody>
	</Table>
);

export default FreeAgentsTable;

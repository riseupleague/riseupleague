"use client";

import React, { useState } from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import { Alert, AlertDescription, AlertTitle } from "@ui/components/alert";
import { AlertCircle } from "lucide-react";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/select";
import { Card, CardContent, CardHeader, CardTitle } from "@ui/components/card";
import { Button } from "@ui/components/button";
import Link from "next/link";

export default function HomeStandingsTable({ divisionsWithStats }) {
	const [selectedDivision, setSelectedDivision] = useState<string>(
		divisionsWithStats[0]._id
	);

	if (!divisionsWithStats || divisionsWithStats.length === 0) {
		return (
			<Alert variant="destructive">
				<AlertCircle className="h-4 w-4" />
				<AlertTitle>Error</AlertTitle>
				<AlertDescription>
					No division data available. Please check the data source and try
					again.
				</AlertDescription>
			</Alert>
		);
	}

	const selectedDivisionData = divisionsWithStats.find(
		(div) => div._id === selectedDivision
	);

	const renderStandings = (division) => {
		if (!division.teams || division.teams.length === 0) {
			return (
				<Alert>
					<AlertCircle className="h-4 w-4" />
					<AlertTitle>No Teams</AlertTitle>
					<AlertDescription>
						No teams available for this division.
					</AlertDescription>
				</Alert>
			);
		}

		const sortedTeams = division.teams
			.sort((a, b) => (b.pointDifference || 0) - (a.pointDifference || 0))
			.sort((a, b) => (b.wpct || 0) - (a.wpct || 0));

		const teamsToShow = sortedTeams.slice(0, 4);

		return (
			<>
				<Table className="text-base">
					<TableHeader>
						<TableRow>
							<TableHead className="w-12">#</TableHead>
							<TableHead>Team</TableHead>
							<TableHead className="text-center">W</TableHead>
							<TableHead className="text-center">L</TableHead>
							<TableHead className="px-1 text-center">Last 3</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{teamsToShow.map((team, index) => {
							return (
								<TableRow key={team.teamName}>
									<TableCell className="font-medium">{index + 1}</TableCell>
									<TableCell>
										<Link href={`/teams/team/${team._id}`}>
											{team.teamName}
										</Link>
									</TableCell>
									<TableCell className="text-center">{team.wins}</TableCell>
									<TableCell className="text-center">{team.losses}</TableCell>
									<TableCell className="relative p-0 text-center">
										<span className="bg-green-600 px-2">{team.streak}</span>
										{team.streak === "3-0" && (
											<span className="absolute">🔥</span>
										)}
									</TableCell>
								</TableRow>
							);
						})}
					</TableBody>
				</Table>

				<Link href={`/standings`} className="w-full">
					<Button className="w-full">View All Standings</Button>
				</Link>
			</>
		);
	};

	return (
		<Card className="w-full border-none bg-none ">
			<CardHeader className="flex flex-row items-center justify-between space-y-0 px-0 pb-2">
				<CardTitle className="text-2xl font-bold">Standings</CardTitle>
				<Select value={selectedDivision} onValueChange={setSelectedDivision}>
					<SelectTrigger className="flex w-[45px] items-center justify-between border-none">
						{/* Show chevron only on mobile */}
						<span className="hidden">
							<SelectValue placeholder="Select Division" />
						</span>
						{/* Chevron icon */}
						<span className=""></span>
					</SelectTrigger>
					<SelectContent>
						{divisionsWithStats.map((division) => (
							<SelectItem key={division._id} value={division._id}>
								{division.divisionName}
							</SelectItem>
						))}
					</SelectContent>
				</Select>
			</CardHeader>
			<CardContent className="px-0">
				{selectedDivisionData && renderStandings(selectedDivisionData)}
			</CardContent>
		</Card>
	);
}

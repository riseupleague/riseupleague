"use client";

import { Button } from "@ui/components/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import { editSeasonAction } from "@/actions/editSeasonAction";
import { useState } from "react";

export default function EditSeason({ season }): JSX.Element {
	const [seasonData, setSeasonData] = useState(season);
	const bindSeasonData = editSeasonAction.bind(seasonData, season._id);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="register">Edit Season</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>
						Edit Season:{" "}
						<span className="text-primary">{season.seasonName}</span>
					</DialogTitle>
					<DialogDescription>Edit the current season.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<Label htmlFor="seasonName">Season name:</Label>
						<Input
							id="seasonName"
							name="seasonName"
							placeholder="New season name"
							onChange={(e) =>
								setSeasonData({ ...seasonData, seasonName: e.target.value })
							}
							defaultValue={season?.seasonName}
							className="text-neutral-900"
						/>
					</div>

					{season?.active !== null && (
						<div className="flex items-center gap-3">
							<Checkbox
								id="active"
								name="active"
								onCheckedChange={(e) =>
									setSeasonData({ ...seasonData, active: e })
								}
								value={seasonData.active}
								defaultChecked={season?.active}
								className="border-neutral-200"
							/>
							<Label htmlFor="season-active">Active</Label>
						</div>
					)}

					{season?.register !== null && (
						<div className="flex items-center gap-3">
							<Checkbox
								id="register"
								name="register"
								onCheckedChange={(e) =>
									setSeasonData({ ...seasonData, register: e })
								}
								value={seasonData.register}
								defaultChecked={season?.register}
								className="border-neutral-200"
							/>
							<Label htmlFor="register">Register Open</Label>
						</div>
					)}

					<Separator className="mb-4 border-b border-neutral-500" />

					<DialogFooter>
						<Button type="submit" formAction={bindSeasonData}>
							Update
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
}

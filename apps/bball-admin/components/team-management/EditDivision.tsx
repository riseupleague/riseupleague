"use client";

import { Button } from "@ui/components/button";
import { Separator } from "@ui/components/separator";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";
import { editDivisionAction } from "@/actions/editDivisionAction";
import { useState } from "react";
import { useFormState, useFormStatus } from "react-dom";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@ui/components/ui/select";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@ui/components/dialog";

export default function EditDivision({
	division,
}: {
	division: any;
}): JSX.Element {
	const { pending } = useFormStatus();
	const [divisionData, setDivisionData] = useState(division);
	const [currentWeek, setCurrentWeek] = useState(0);

	const bindDivisionData = editDivisionAction.bind(
		null,
		divisionData,
		division._id
	);
	const [state, formAction] = useFormState(bindDivisionData, null);

	const noDataChanged =
		JSON.stringify(division) === JSON.stringify(divisionData) ? true : false;

	const firstSlotHours = Number(division.startTime.slice(0, 2));
	const firstSlotMinutes = Number(division.startTime.slice(3, 5));

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button variant="register">Edit Division</Button>
			</DialogTrigger>
			<DialogContent className="rounded border border-neutral-500 bg-neutral-900">
				<DialogHeader>
					<DialogTitle>
						Edit Division:{" "}
						<span className="text-primary">{division?.divisionName}</span>
					</DialogTitle>
					<DialogDescription>Edit this division.</DialogDescription>
				</DialogHeader>

				<Separator className="border-b border-neutral-500" />

				<form action={formAction} className="flex flex-col gap-4">
					<div className="flex flex-col gap-3">
						<Label htmlFor="divisionName">Division name:</Label>
						<Input
							onChange={(e) =>
								setDivisionData({
									...divisionData,
									divisionName: e.target.value,
								})
							}
							id="divisionName"
							placeholder="New division name"
							defaultValue={division?.divisionName}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="location">Division location:</Label>
						<Input
							onChange={(e) =>
								setDivisionData({ ...divisionData, location: e.target.value })
							}
							id="location"
							placeholder="New location name"
							defaultValue={division?.location}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex flex-col gap-3">
						<Label htmlFor="day">Division day of the week:</Label>
						<Input
							onChange={(e) =>
								setDivisionData({ ...divisionData, day: e.target.value })
							}
							id="day"
							placeholder="New day name"
							defaultValue={division?.day}
							className="text-neutral-900"
						/>
					</div>

					<div className="flex gap-3">
						<div className="w-1/2">
							<Label htmlFor="startTime">Start Time:</Label>
							<Input
								onChange={(e) =>
									setDivisionData({
										...divisionData,
										startTime: e.target.value,
									})
								}
								id="startTime"
								placeholder="New start name"
								defaultValue={division?.startTime}
								className="text-neutral-900"
							/>
						</div>
						<div className="w-1/2">
							<Label htmlFor="endTime">End Time:</Label>
							<Input
								onChange={(e) =>
									setDivisionData({ ...divisionData, endTime: e.target.value })
								}
								id="endTime"
								placeholder="New end name"
								defaultValue={division?.endTime}
								className="text-neutral-900"
							/>
						</div>
					</div>

					<div className="flex gap-3">
						<div className="w-1/2">
							<Label htmlFor="earlyBirdPrice">Early Bird Price:</Label>
							<Input
								onChange={(e) =>
									setDivisionData({
										...divisionData,
										earlyBirdPrice: e.target.value,
									})
								}
								id="earlyBirdPrice"
								type="number"
								placeholder="New early bird price"
								defaultValue={division?.earlyBirdPrice}
								className="text-neutral-900"
							/>
						</div>
						<div className="w-1/2">
							<Label htmlFor="regularPrice">Regular Price:</Label>
							<Input
								onChange={(e) =>
									setDivisionData({
										...divisionData,
										regularPrice: e.target.value,
									})
								}
								id="regularPrice"
								type="number"
								placeholder="New regular price"
								defaultValue={division?.regularPrice}
								className="text-neutral-900"
							/>
						</div>
					</div>

					{division?.earlyBirdOpen && (
						<div className="flex items-center gap-3">
							<Checkbox
								id="earlyBirdOpen"
								onCheckedChange={(e) =>
									setDivisionData({ ...divisionData, earlyBirdOpen: e })
								}
								defaultChecked={division?.earlyBirdOpen}
								className="border-neutral-200"
							/>
							<Label htmlFor="earlyBirdOpen">Early Bird Open</Label>
						</div>
					)}

					<div>
						<h4>Schedule</h4>
						<Separator className="border-b border-neutral-500" />
						<div className="mt-4 flex gap-4">
							<h5>Week #:</h5>
							<Select onValueChange={(e) => setCurrentWeek(Number(e))}>
								<SelectTrigger className="w-44">
									<SelectValue placeholder="select week number" />
								</SelectTrigger>
								<SelectContent>
									<SelectGroup>
										{/* {divisionData.teamSchedule.map((_, index) => (
											<SelectItem key={index} value={(index + 1).toString()}>
												{index + 1}
											</SelectItem>
										))} */}
									</SelectGroup>
								</SelectContent>
							</Select>
						</div>
						{/* {divisionData.teamSchedule[currentWeek].map((slot, index) => (
							<div key={index} className="flex h-16 items-center gap-3">
								<p className="flex h-full w-full items-center">
									{firstSlotHours + ":" + firstSlotMinutes} -{" "}
									{firstSlotHours + index + ":" + firstSlotMinutes}
								</p>
								<div className="w-full">
									<Label htmlFor="startTime">Home Team</Label>
									<Select onValueChange={handleScheduleChange}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="select a team" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{division?.teams.map((team, index) => (
													<SelectItem key={index} value={team.teamName}>
														{team.teamName}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
								<div className="w-full">
									<Label htmlFor="endTime">Away Team</Label>
									<Select onValueChange={handleScheduleChange}>
										<SelectTrigger className="w-full">
											<SelectValue placeholder="select a team" />
										</SelectTrigger>
										<SelectContent>
											<SelectGroup>
												{division?.teams.map((team, index) => (
													<SelectItem key={index} value={team.teamName}>
														{team.teamName}
													</SelectItem>
												))}
											</SelectGroup>
										</SelectContent>
									</Select>
								</div>
							</div>
						))} */}
					</div>

					<Separator className="mb-4 border-b border-neutral-500" />

					<DialogFooter>
						<Button
							type="submit"
							disabled={pending || noDataChanged}
							aria-disabled={pending}
						>
							{pending ? "Updating..." : "Update"}
						</Button>
					</DialogFooter>

					<div className="text-right">
						{state?.status === 200 && (
							<p className="text-green-500">Successfully updated season!</p>
						)}
						{state?.status === 404 && (
							<p className="text-primary">Season not found.</p>
						)}
						{state?.status === 500 && (
							<p className="text-primary">Internal server error.</p>
						)}
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
}

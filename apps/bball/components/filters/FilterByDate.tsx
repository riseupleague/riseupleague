"use client";

import { format } from "date-fns";
import { Button } from "@ui/components/button";
import { Calendar } from "@ui/components/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@ui/components/popover";
import { useEffect, useState } from "react";
import { cn } from "../../../../packages/ui/lib/utils";
import { Label } from "@ui/components/label";
import { redirect } from "next/navigation";

const FilterByDate = ({ dateInSeconds }): JSX.Element => {
	const selectedDate = new Date(dateInSeconds * 1000);

	const [date, setDate] = useState<Date>();
	useEffect(() => {
		if (date) {
			// Convert the date to a Unix timestamp (in milliseconds)
			const unixTimestamp = date.getTime();

			// Convert the Unix timestamp to seconds
			const seconds = unixTimestamp / 1000;

			console.log(seconds); // Output: 1841508800
			redirect(`/schedule/${seconds}`);
		}
	}, [date]);
	return (
		<div className="font-barlow flex flex-col gap-2">
			<Label>Filter By Date:</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start px-2 text-left font-normal md:w-[250px]",
							!selectedDate && "text-muted-foreground"
						)}
					>
						{selectedDate ? (
							format(selectedDate, "PPP")
						) : (
							<span>Pick a date</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto rounded-sm border border-neutral-500 p-0">
					<Calendar
						className="font-barlow bg-neutral-900 text-lg"
						mode="single"
						selected={date}
						onSelect={setDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default FilterByDate;

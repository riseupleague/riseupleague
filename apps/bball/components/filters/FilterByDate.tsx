"use client";

import { add, format } from "date-fns";
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
import { utcToZonedTime } from "date-fns-tz";

const FilterByDate = ({ formattedEstDate }): JSX.Element => {
	const selectedDate = new Date(formattedEstDate);
	const formattedDate = format(add(selectedDate, { days: 1 }), "MMM do, yyyy");
	const [date, setDate] = useState<Date>();

	useEffect(() => {
		if (date) {
			// Convert the date to a Unix timestamp (in milliseconds)
			const estTime = utcToZonedTime(date, "America/Toronto");
			const formattedEst = format(estTime, "yyyy-MM-dd");

			redirect(`/schedule/${formattedEst}`);
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
							<span>{formattedDate}</span>
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

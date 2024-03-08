"use client";

import { format, startOfDay, sub } from "date-fns";
import { Button } from "@ui/components/button";
import { Calendar } from "@ui/components/calendar";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@ui/components/popover";
import { useState } from "react";
import { cn } from "../../../../packages/ui/lib/utils";
import { Label } from "@ui/components/label";

const FilterByDate = (): JSX.Element => {
	const [date, setDate] = useState<Date>();

	return (
		<div className="font-barlow flex flex-col gap-2">
			<Label>Filter By Date:</Label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className={cn(
							"w-full justify-start px-2 text-left font-normal md:w-[250px]",
							!date && "text-muted-foreground"
						)}
					>
						{date ? format(date, "PPP") : <span>Pick a date</span>}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto rounded-sm border border-neutral-500 p-0">
					<Calendar
						className="font-barlow bg-neutral-900 text-lg"
						mode="single"
						selected={date}
						onSelect={setDate}
						initialFocus
						disabled={(date) => date < sub(startOfDay(new Date()), { days: 1 })}
					/>
				</PopoverContent>
			</Popover>
		</div>
	);
};

export default FilterByDate;

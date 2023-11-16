"use client";
import { useState } from "react";
import { Separator } from "@ui/components/separator";
import { Button } from "@ui/components/button";
import { Label } from "@ui/components/label";
import { Input } from "@ui/components/input";
import { Checkbox } from "@ui/components/checkbox";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@ui/components/table";
import Link from "next/link";
interface FormData {
	teamName: string;
	teamNameShort?: string;
	jerseyName: string;
	jerseyNumber: string;
	jerseySize: string;
	shortSize: string;
	termsChecked: boolean;
	refundChecked: boolean;
}

export default function SummaryPayment({
	formData,
}: {
	formData: FormData;
}): JSX.Element {
	return (
		<>
			<h3 className="mt-20  text-3xl uppercase">Summary:</h3>
			<div>
				<div className="mt-5 flex flex-col gap-5 rounded-md bg-neutral-700 px-3 py-6">
					<h4 className="text-lg uppercase underline">Team Identity:</h4>

					<section className="flex items-center">
						<Label className="uppercase">Team Name:</Label>
						<Input
							type="text"
							className="w-40 border-0 bg-neutral-700 py-[16px]"
							value={formData.teamName}
							disabled
						/>
					</section>
					<section className="flex items-center">
						<Label className="uppercase">Abbreviation:</Label>
						<Input
							type="text"
							className="w-40 border-0 bg-neutral-700 py-[16px]"
							value={formData.teamNameShort}
							disabled
						/>
					</section>

					<Separator orientation="horizontal" className="my-5 bg-neutral-600" />

					<h4 className="text-lg uppercase underline">Your Own Jersey:</h4>
					{/* for early birds only */}
					<section className="flex items-center">
						<Label className="uppercase">Name on the back of the Jersey</Label>
						<Input
							type="text"
							className="w-40 border-0 bg-neutral-700 py-[16px]"
							value={formData.jerseyName}
							disabled
						/>
					</section>
					<section className="flex items-center">
						<Label className="uppercase">Jersey Number</Label>
						<Input
							type="text"
							className="w-40 border-0 bg-neutral-700 py-[16px]"
							value={formData.jerseyNumber}
							disabled
						/>
					</section>

					<section className="flex items-center">
						<Label className="uppercase">Jersey Top Size</Label>
						<Input
							type="text"
							className="w-40 border-0 bg-neutral-700 py-[16px]"
							value={formData.jerseySize}
							disabled
						/>
					</section>
					<section className="flex items-center">
						<Label className="uppercase">Jersey Bottom Size</Label>
						<Input
							type="text"
							className="w-40 border-0 bg-neutral-700 py-[16px]"
							value={formData.shortSize}
							disabled
						/>
					</section>
					<section className="flex flex-col gap-3">
						<div className="flex items-center">
							<Checkbox
								id="checkBoxTerms"
								className="!mr-4 border-white"
								checked={formData.termsChecked}
							/>
							<Label
								htmlFor="checkBoxTerms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								I have read and agree to the{" "}
								<Link
									className="text-primary transition-all hover:underline"
									href="/terms-and-conditions"
									target="_blank"
								>
									Terms and Conditions
								</Link>
								.
							</Label>
						</div>
						<div className="flex items-center">
							<Checkbox
								id="checkBoxRefund"
								className="!mr-4 border-white"
								checked={formData.refundChecked}
							/>
							<Label
								htmlFor="checkBoxRefund"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								I have read and agree to the{" "}
								<Link
									className="text-primary transition-all hover:underline"
									href="/refund-policy"
									target="_blank"
								>
									Refund Policy
								</Link>
								.
							</Label>
						</div>
					</section>
				</div>

				<div className="mt-20 flex flex-col gap-10">
					<h4 className="text-3xl uppercase">Overall total:</h4>
					<p className="text-4xl">$254.25</p>
					<Button className="uppercase">Pay in full</Button>
					<Separator orientation="horizontal" className="bg-neutral-600" />{" "}
					<p className="text-4xl">
						$67.80{" "}
						<span className="text-sm text-neutral-50">
							Today + 3 more $67.80 bi-weekly
						</span>
					</p>
					<Table>
						<TableHeader>
							<TableRow>
								<TableHead className="uppercase">Payment</TableHead>
								<TableHead className="uppercase">Due dates</TableHead>
								<TableHead className="uppercase">Amount</TableHead>
							</TableRow>
						</TableHeader>
						<TableBody>
							<TableRow className="uppercase">
								<TableCell>1st</TableCell>
								<TableCell>sep 4, 2023</TableCell>
								<TableCell>$67.80</TableCell>
							</TableRow>
							<TableRow className="uppercase">
								<TableCell>2nd</TableCell>
								<TableCell>sep 4, 2023</TableCell>
								<TableCell>$67.80</TableCell>
							</TableRow>
							<TableRow className="uppercase">
								<TableCell>3rd</TableCell>
								<TableCell>sep 4, 2023</TableCell>
								<TableCell>$67.80</TableCell>
							</TableRow>
							<TableRow className="uppercase">
								<TableCell>4th</TableCell>
								<TableCell>sep 4, 2023</TableCell>
								<TableCell>$67.80</TableCell>
							</TableRow>
						</TableBody>
					</Table>
					<Button variant="secondary" className="uppercase text-neutral-300">
						Pay in instalments
					</Button>
					<ul className="flex flex-col gap-4 text-sm uppercase text-neutral-300">
						<li>
							Your card will be saved on file and automatically charged on the
							scheduled dates ABOVE.
						</li>
						<li>
							Scheduled online payments will be subject to an additional Online
							Payment Fee.
						</li>
						<li>
							late payments will be subject to additional fees or may receive
							penalties.
						</li>
					</ul>
				</div>
			</div>
		</>
	);
}

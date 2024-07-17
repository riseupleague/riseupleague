import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui/components/tabs";
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from "@ui/components/checkbox";
import { Label } from "@ui/components/label";
import Link from "next/link";
import { Button } from "@ui/components/button";
import { Loader2 } from "lucide-react";

const AddFreeAgentNone = ({
	handleSubmit,
	onSubmit,
	control,
	errors,
	registerInfo,
	isLoader,
	setSubmitType,
	onSubmitInstallments,
}) => {
	return (
		<Tabs defaultValue="regular">
			<TabsList className="grid w-full grid-cols-3">
				<TabsTrigger value="regular">One Time Payment</TabsTrigger>
				<TabsTrigger value="installment">Four Installments</TabsTrigger>
				<TabsTrigger value="full">Full Team Payment</TabsTrigger>
			</TabsList>
			<TabsContent value="regular">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h4 className="mt-10 text-center text-xl uppercase">
						One Time Payment
					</h4>
					<p className="text-lg"> Please Check All Boxes Before Proceeding</p>
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToTerms"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
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
					{errors.agreeToTerms && (
						<p className="text-red-600">{errors.agreeToTerms.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToRefundPolicy"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxRefund"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
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
					{errors.agreeToRefundPolicy && (
						<p className="text-red-600">{errors.agreeToRefundPolicy.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="receiveNews"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxNews"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxNews"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I want to receive emails for the latest news about Rise Up.
						</Label>
					</div>
					<div className="mt-5">
						<p className="text-xl uppercase">Price Breakdown Per Player:</p>
						<p className="my-2">Gyms Fee: $80</p>
						<p className="my-2">Uniforms: $50</p>
						<p className="my-2">Media: $55</p>
						<p className="my-2">Referees: $40</p>
						<p className="my-2">Stats/Game Videos/Graphics: $55</p>
						<p className="my-2">
							Regular Price Total: ${80 + 50 + 55 + 40 + 55}
						</p>
					</div>

					{registerInfo.division?.earlyBirdOpen ? (
						<div className="mt-5">
							<p className="text-xl uppercase">Early Bird Player Discount:</p>
							<p className="text-2xl font-semibold">
								${registerInfo.division?.earlyBirdPrice} + tax
							</p>
							<ul>
								<li className="my-2">
									Regular price is ${registerInfo.division?.regularPrice} + tax
								</li>

								<li className="my-2">
									Get a $
									{80 +
										50 +
										55 +
										40 +
										55 -
										registerInfo.division?.earlyBirdPrice}{" "}
									discount
								</li>
								<li className="my-2">Add unlimited players</li>

								<li className="my-2">Limited Time Only</li>
							</ul>
						</div>
					) : (
						<div className="mt-5">
							<p className="text-xl uppercase">Regular Player Price:</p>
							<p className="text-2xl font-semibold">
								${registerInfo.division?.regularPrice} + tax
							</p>
							<ul>
								<li className="my-2">
									Regular price is ${registerInfo.division?.regularPrice} + tax
								</li>

								<li className="my-2">
									Get a $
									{80 + 50 + 55 + 40 + 55 - registerInfo.division?.regularPrice}{" "}
									discount
								</li>
								<li className="my-2">Add unlimited players</li>

								<li className="my-2">Limited Time Only</li>
							</ul>
						</div>
					)}

					<Button
						type="submit"
						onClick={() => setSubmitType("player")}
						className="mt-4 w-full"
					>
						{isLoader ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							"Proceed to checkout"
						)}
					</Button>
				</form>
			</TabsContent>
			<TabsContent value="installment">
				<form onSubmit={handleSubmit(onSubmitInstallments)}>
					<h4 className="mt-10 text-center text-xl uppercase">
						Four Installments
					</h4>
					<p className="text-lg"> Please Check All Boxes Before Proceeding</p>
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToTerms"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
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
					{errors.agreeToTerms && (
						<p className="text-red-600">{errors.agreeToTerms.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToRefundPolicy"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxRefund"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
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
					{errors.agreeToRefundPolicy && (
						<p className="text-red-600">{errors.agreeToRefundPolicy.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="receiveNews"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxNews"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxNews"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I want to receive emails for the latest news about Rise Up.
						</Label>
					</div>

					<div className="mt-5">
						<p className="text-xl uppercase">Price Breakdown Per Player:</p>
						<p className="my-2">Gyms Fee: $80</p>
						<p className="my-2">Uniforms: $50</p>
						<p className="my-2">Media: $55</p>
						<p className="my-2">Referees: $40</p>
						<p className="my-2">Stats/Game Videos/Graphics: $55</p>
						<p className="my-2">
							Regular Price Total: ${80 + 50 + 55 + 40 + 55}
						</p>
					</div>

					<div className="mt-5">
						<p className="text-xl uppercase">Installment Price:</p>
						<p className="text-2xl font-semibold">
							${registerInfo.division?.firstInstalmentPrice} + tax and $
							{registerInfo.division?.instalmentPrice} + tax three times
							biweekly
						</p>
						<ul>
							<li className="my-2">
								First Payment: ${registerInfo.division?.firstInstalmentPrice} +
								tax
							</li>

							<li className="my-2">
								Second Payment: ${registerInfo.division?.instalmentPrice} + tax
							</li>
							<li className="my-2">
								Third Payment: ${registerInfo.division?.instalmentPrice} + tax
							</li>

							<li className="my-2">
								Fourth Payment: ${registerInfo.division?.instalmentPrice} + tax
							</li>
							<li className="my-2">
								Total: ${registerInfo.division?.regularPrice} + tax
							</li>
						</ul>
					</div>

					<Button type="submit" className="mt-4 w-full">
						{isLoader ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							"Proceed to checkout"
						)}
					</Button>
				</form>
			</TabsContent>
			<TabsContent value="full">
				<form onSubmit={handleSubmit(onSubmit)}>
					<h4 className="mt-10 text-center text-xl uppercase">
						Full Team Payment
					</h4>
					<p className="text-lg"> Please Check All Boxes Before Proceeding</p>
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToTerms"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxTerms"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
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
					{errors.agreeToTerms && (
						<p className="text-red-600">{errors.agreeToTerms.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="agreeToRefundPolicy"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxRefund"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
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
					{errors.agreeToRefundPolicy && (
						<p className="text-red-600">{errors.agreeToRefundPolicy.message}</p>
					)}
					<div className="my-2 flex items-center">
						<Controller
							name="receiveNews"
							control={control}
							render={({ field }) => (
								<Checkbox
									id="checkBoxNews"
									className="!mr-4 border-white"
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							)}
						/>
						<Label
							htmlFor="checkBoxNews"
							className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
						>
							I want to receive emails for the latest news about Rise Up.
						</Label>
					</div>

					<div className="mt-5">
						<p className="text-xl uppercase">Price Breakdown Per Player:</p>
						<p className="my-2">Gyms Fee: $80</p>
						<p className="my-2">Uniforms: $50</p>
						<p className="my-2">Media: $55</p>
						<p className="my-2">Referees: $40</p>
						<p className="my-2">Stats/Game Videos/Graphics: $55</p>
						<p className="my-2">
							Regular Price Total: ${80 + 50 + 55 + 40 + 55}
						</p>
					</div>

					{registerInfo.division?.earlyBirdOpen ? (
						<div className="mt-5">
							<p className="text-xl uppercase">Early Bird Team Discount:</p>
							<p className="text-2xl font-semibold">
								${registerInfo.division?.earlyBirdTeamPrice} tax included
							</p>
							<ul>
								<li className="my-2">
									As low as $
									{Number(registerInfo.division?.earlyBirdTeamPrice) / 10} per
									player
								</li>
								<li className="my-2">No tax!</li>
								<li className="my-2">Save more!</li>
								<li className="my-2">Maximum 10 players</li>
							</ul>
						</div>
					) : (
						<div className="mt-5">
							<p className="text-xl uppercase">Regular Team Price:</p>
							<p className="text-2xl font-semibold">
								${registerInfo.division?.regularTeamPrice}
							</p>
							<ul>
								<li className="my-2">
									As low as $
									{Number(registerInfo.division?.regularTeamPrice) / 10} per
									player
								</li>
								<li className="my-2">No tax!</li>
								<li className="my-2">Save more!</li>
								<li className="my-2">Maximum 10 players</li>
							</ul>
						</div>
					)}

					<Button
						onClick={() => setSubmitType("team")}
						type="submit"
						className="mt-4 w-full"
					>
						{isLoader ? (
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						) : (
							"Pay for whole team"
						)}
					</Button>
				</form>
			</TabsContent>
		</Tabs>
	);
};

export default AddFreeAgentNone;
